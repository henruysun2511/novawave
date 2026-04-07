"use client";

import { getSocket } from "@/libs/socket";
import { ArrowLeftOutlined, AudioOutlined } from "@ant-design/icons";
import { Button, Modal, notification } from "antd";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { RoomStatusChip } from "@/components/client/Room/room-chip";
import Loading from "@/components/common/loading";
import { useRoomSocket } from "@/hooks/useRoomSocket";
import { useToast } from "@/hooks/useToast";
import {
  ROOM_MESSAGE_QUERY_KEY,
  ROOM_QUERY_KEY,
  useAddRoomQueueItem,
  useCreateRoomMessage,
  useModerateRoomParticipant,
  useRoomDetail,
  useRoomMessages,
  useRoomParticipants,
  useUpdateRoomQueueItem,
} from "@/queries/useRoomQuery";
import { useSearch } from "@/queries/useSearchQuery";
import { useAuthStore } from "@/stores/useAuthStore";
import {
  RoomControlAction,
  RoomModerationAction,
  RoomParticipantStatus,
  RoomQueueItemStatus,
  RoomStatus,
} from "@/types/constant.type";
import { RoomDetail, RoomMessage, RoomParticipant, RoomQueueItem, RoomRealtimeNotification } from "@/types/object.type";
import { useQueryClient } from "@tanstack/react-query";
import { RoomDetailLeftPanel } from "./left-panel/room-detail-left-panel";
import { RoomDetailRightPanel } from "./right-panel/room-detail-right-panel";
import {
  SearchSongItem,
  createRealtimeMessage,
  getHostId,
  getUserId,
  getUserName,
  mergeRoomState,
  upsertMessage,
  upsertParticipant,
  upsertQueueItem,
} from "./room-detail-helpers";

const moderationStoragePrefix = "room-moderation:";

function getErrorMessage(error: unknown, fallback: string) {
  if (
    typeof error === "object" &&
    error !== null &&
    "response" in error &&
    typeof (error as { response?: unknown }).response === "object" &&
    (error as { response?: { data?: unknown } }).response?.data &&
    typeof (error as { response?: { data?: { message?: unknown } } }).response?.data?.message === "string"
  ) {
    return (error as { response?: { data?: { message?: string } } }).response?.data?.message || fallback;
  }

  return fallback;
}

export default function RoomDetailPage() {
  const params = useParams<{ id: string }>();
  const toast = useToast();
  const queryClient = useQueryClient();
  const roomId = String(params?.id || "");
  const router = useRouter();
  const [notifyApi, notifyContextHolder] = notification.useNotification();
  const currentUser = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const { data: roomData, isLoading: roomLoading } = useRoomDetail(roomId);
  const { data: roomMessagesData, isLoading: messageLoading } = useRoomMessages(roomId, 1, 30);
  const { data: roomParticipantsData } = useRoomParticipants(roomId);
  const { mutate: addQueueItem, isPending: addingQueueItem } = useAddRoomQueueItem();
  const { mutateAsync: createMessage } = useCreateRoomMessage();
  const { mutate: updateQueueItem } = useUpdateRoomQueueItem();
  const { mutate: moderateParticipant } = useModerateRoomParticipant();

  const [room, setRoom] = useState<RoomDetail | null>(null);
  const [messages, setMessages] = useState<RoomMessage[]>([]);
  const [participants, setParticipants] = useState<RoomParticipant[]>([]);
  const [activityFeed, setActivityFeed] = useState<RoomRealtimeNotification[]>([]);
  const [selectedQueueItemId, setSelectedQueueItemId] = useState<string | null>(null);
  const [commentInput, setCommentInput] = useState("");
  const [requestKeyword, setRequestKeyword] = useState("");
  const [requestSearchKeyword, setRequestSearchKeyword] = useState("");
  const [requestingSongId, setRequestingSongId] = useState<string | null>(null);
  const [moderationState, setModerationState] = useState<RoomParticipantStatus | null>(null);
  const [moderationReason, setModerationReason] = useState("");
  const [showLeaveConfirm, setShowLeaveConfirm] = useState(false);
  const [playbackSeconds, setPlaybackSeconds] = useState(0);
  const [durationSeconds, setDurationSeconds] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const syncingAudioRef = useRef(false);

  const isHost = useMemo(() => {
    if (!room || !currentUser?.sub) return false;
    return getHostId(room) === currentUser.sub;
  }, [currentUser?.sub, room]);

  const queue = useMemo(() => room?.queue ?? [], [room?.queue]);
  const visibleQueue = useMemo(
    () => queue.filter((item) => item.status !== RoomQueueItemStatus.PENDING && item.status !== RoomQueueItemStatus.REJECTED && item.status !== RoomQueueItemStatus.REMOVED),
    [queue]
  );
  const requestQueue = useMemo(
    () => queue.filter((item) => item.status === RoomQueueItemStatus.PENDING || item.status === RoomQueueItemStatus.REJECTED),
    [queue]
  );
  const selectedQueueItem = queue.find((item) => item._id === selectedQueueItemId) ?? null;

  const { data: requestSearchData, isFetching: requestSearching } = useSearch(requestSearchKeyword.trim());
  const requestSongs = (requestSearchData?.songs ?? []) as SearchSongItem[];

  useEffect(() => {
    if (roomData?.data) setRoom(roomData.data);
  }, [roomData]);

  useEffect(() => {
    if (roomMessagesData?.data) setMessages(roomMessagesData.data);
  }, [roomMessagesData]);

  useEffect(() => {
    if (roomParticipantsData?.data) setParticipants(roomParticipantsData.data);
  }, [roomParticipantsData]);

  useEffect(() => {
    if (!roomId || typeof window === "undefined") return;
    const stored = window.localStorage.getItem(`${moderationStoragePrefix}${roomId}`);
    if (!stored) return;
    const parsed = JSON.parse(stored) as { status: RoomParticipantStatus; reason?: string };
    setModerationState(parsed.status);
    setModerationReason(parsed.reason || "");
  }, [roomId]);

  useEffect(() => {
    if (!room?.currentSong?.mp3Link || !audioRef.current) return;
    const audio = audioRef.current;
    const positionSeconds = Math.max(0, (room.playbackPositionMs ?? 0) / 1000);
    syncingAudioRef.current = true;

    if (audio.src !== room.currentSong.mp3Link) {
      audio.src = room.currentSong.mp3Link;
      audio.load();
    }

    if (Math.abs(audio.currentTime - positionSeconds) > 1.5) {
      audio.currentTime = positionSeconds;
    }

    setPlaybackSeconds(positionSeconds);
    setDurationSeconds(room.currentSong.duration ?? 0);

    const releaseSyncFlag = () => {
      window.setTimeout(() => {
        syncingAudioRef.current = false;
      }, 0);
    };

    if (room.isPlaying) {
      void audio.play().catch(() => undefined).finally(releaseSyncFlag);
    } else {
      audio.pause();
      releaseSyncFlag();
    }
  }, [room?.currentSong?.duration, room?.currentSong?.mp3Link, room?.isPlaying, room?.playbackPositionMs]);

  const emitHostControl = useCallback((action: RoomControlAction, extra?: { currentTime?: number; currentSongId?: string; currentQueueItemId?: string }) => {
    if (!room || !isHost) return;
    const socket = getSocket();
    if (!socket) {
      toast.error("Socket chua san sang");
      return;
    }

    socket.emit("HOST_CONTROL", {
      roomId,
      action,
      currentTime: extra?.currentTime,
      currentSongId: extra?.currentSongId,
      currentQueueItemId: extra?.currentQueueItemId,
    });

    queryClient.invalidateQueries({ queryKey: [ROOM_QUERY_KEY, roomId] });
  }, [isHost, room, roomId, toast]);

  const setAudioElement = useCallback((audio: HTMLAudioElement | null) => {
    audioRef.current = audio;
  }, []);

  const handlePlayerListen = useCallback((seconds: number) => {
    setPlaybackSeconds(seconds);
  }, []);

  const handlePlayerDurationChange = useCallback((seconds: number) => {
    if (seconds > 0) {
      setDurationSeconds(seconds);
    }
  }, []);

  const handlePlayerPlay = useCallback(() => {
    if (!isHost || syncingAudioRef.current || !room) return;
    emitHostControl(RoomControlAction.PLAY, {
      currentTime: Math.round((audioRef.current?.currentTime ?? playbackSeconds) * 1000),
      currentSongId: typeof room.currentSongId === "string" ? room.currentSongId : room.currentSongId?._id,
      currentQueueItemId: room.currentQueueItemId ?? undefined,
    });
  }, [emitHostControl, isHost, playbackSeconds, room]);

  const handlePlayerPause = useCallback(() => {
    if (!isHost || syncingAudioRef.current || !room) return;
    emitHostControl(RoomControlAction.PAUSE, {
      currentTime: Math.round((audioRef.current?.currentTime ?? playbackSeconds) * 1000),
      currentSongId: typeof room.currentSongId === "string" ? room.currentSongId : room.currentSongId?._id,
      currentQueueItemId: room.currentQueueItemId ?? undefined,
    });
  }, [emitHostControl, isHost, playbackSeconds, room]);

  const handlePlayerSeek = useCallback((seconds: number) => {
    if (!isHost || syncingAudioRef.current || !room) return;
    emitHostControl(RoomControlAction.SEEK, {
      currentTime: Math.round(seconds * 1000),
      currentSongId: typeof room.currentSongId === "string" ? room.currentSongId : room.currentSongId?._id,
      currentQueueItemId: room.currentQueueItemId ?? undefined,
    });
  }, [emitHostControl, isHost, room]);

  const handlePlayerEnded = useCallback(() => {
    if (!isHost || syncingAudioRef.current) return;
    emitHostControl(RoomControlAction.NEXT);
  }, [emitHostControl, isHost]);

  const emitComment = async () => {
    if (!commentInput.trim()) return;
    const content = commentInput.trim();
    try {
      const response = await createMessage({ id: roomId, data: { content } });
      const payload = (response.data?.data ?? response.data) as RoomMessage | undefined;

      if (payload?._id) {
        setMessages((prev) => upsertMessage(prev, payload).slice(0, 50));
      }

      setCommentInput("");
      await queryClient.invalidateQueries({ queryKey: [...ROOM_MESSAGE_QUERY_KEY, roomId] });
    } catch (error: unknown) {
      toast.error(getErrorMessage(error, "Khong the gui binh luan"));
    }
  };

  const handleRequestSong = useCallback((songId: string) => {
    setRequestingSongId(songId);
    addQueueItem(
      { id: roomId, data: { songId } },
      {
        onSuccess: () => {
          toast.success(isHost ? "Đã thêm bài hát vào hàng đợi" : "Đã gửi yêu cầu bài hát");
          setRequestKeyword("");
          setRequestSearchKeyword("");
          setRequestingSongId(null);
        },
        onError: (error: unknown) => {
          toast.error(getErrorMessage(error, "Có lỗi xảy ra"));
          setRequestingSongId(null);
        },
      }
    );
  }, [addQueueItem, isHost, roomId, toast]);

  const handleResolveRequest = useCallback((queueId: string, status: RoomQueueItemStatus.APPROVED | RoomQueueItemStatus.REJECTED) => {
    updateQueueItem(
      { id: roomId, queueId, data: { status } },
      {
        onSuccess: () => toast.success(status === RoomQueueItemStatus.APPROVED ? "Da chap nhan yeu cau" : "Da tu choi yeu cau"),
        onError: (error: unknown) => toast.error(getErrorMessage(error, "Khong the cap nhat yeu cau")),
      }
    );
  }, [roomId, toast, updateQueueItem]);

  const handleModerate = useCallback((participantUserId: string, action: RoomModerationAction) => {
    moderateParticipant(
      { id: roomId, participantUserId, data: { action } },
      {
        onSuccess: () => toast.success(action === RoomModerationAction.KICK ? "Da kick thanh vien" : "Da ban thanh vien"),
        onError: (error: unknown) => toast.error(getErrorMessage(error, "Co loi xay ra")),
      }
    );
  }, [moderateParticipant, roomId, toast]);

  const roomSocketHandlers = useMemo(
    () => ({
      ROOM_UPDATED: (payload: Partial<RoomDetail>) => {
        setRoom((prev) => mergeRoomState(prev, payload));
        setActivityFeed((prev) => [
          createRealtimeMessage("roomUpdated", "Phong vua duoc cap nhat trang thai."),
          ...prev,
        ].slice(0, 30));
      },
      ROOM_ENDED: (payload: Partial<RoomDetail>) => {
        setRoom((prev) => mergeRoomState(prev, { ...payload, status: RoomStatus.ENDED, isPlaying: false }));
        setActivityFeed((prev) => [
          createRealtimeMessage("roomEnded", "Phong da ket thuc."),
          ...prev,
        ].slice(0, 30));
      },
      QUEUE_UPDATED: (payload: RoomQueueItem) => {
        setRoom((prev) => (prev ? ({ ...prev, queue: upsertQueueItem(prev.queue, payload) }) : prev));
        void queryClient.invalidateQueries({ queryKey: [ROOM_QUERY_KEY, roomId] });

      },
      REQUEST_UPDATED: (payload: RoomQueueItem) => {
        setRoom((prev) => (prev ? ({ ...prev, queue: upsertQueueItem(prev.queue, payload) }) : prev));
        setActivityFeed((prev) => [
          createRealtimeMessage(
            "requestResolved",
            `Yeu cau bai ${payload.songId?.name} da duoc ${payload.status === RoomQueueItemStatus.APPROVED ? "chap nhan" : "tu choi"}.`,
            payload.songId?.imageUrl,
            payload
          ),
          ...prev,
        ].slice(0, 30));
      },
      RECEIVE_MESSAGE: (payload: RoomMessage) => {
        setMessages((prev) => upsertMessage(prev, payload).slice(0, 50));
        // setActivityFeed((prev) => [
        //   createRealtimeMessage("message", `${getUserName(payload.userId)} vua gui binh luan moi.`),
        //   ...prev,
        // ].slice(0, 30));
      },
      USER_JOINED: (payload: RoomParticipant) => {
        setParticipants((prev) => upsertParticipant(prev, payload));
        setActivityFeed((prev) => [
          createRealtimeMessage("join", `${getUserName(payload.userId)} da tham gia phong.`),
          ...prev,
        ].slice(0, 30));
      },
      USER_LEFT: (payload: { userId: string }) => {
        setParticipants((prev) => prev.filter((item) => getUserId(item.userId) !== payload.userId));
        setActivityFeed((prev) => [
          createRealtimeMessage("leave", "Co nguoi vua roi khoi phong."),
          ...prev,
        ].slice(0, 30));
      },
      NEW_REQUEST_NOTIFICATION: (payload: RoomQueueItem) => {
        setRoom((prev) => (prev ? ({ ...prev, queue: upsertQueueItem(prev.queue, payload) }) : prev));
        setActivityFeed((prev) => [
          createRealtimeMessage(
            "request",
            `${getUserName(payload.requestedBy)} vua gui yeu cau them bai ${payload.songId?.name}.`,
            payload.songId?.imageUrl,
            payload
          ),
          ...prev,
        ].slice(0, 30));

        if (isHost) {
          notifyApi.info({
            key: payload._id,
            placement: "bottomRight",
            duration: 10,
            icon: <></>,
            className: "!bg-[#18181b]/80 !backdrop-blur-xl !border !border-white/10 !rounded-2xl !p-0 overflow-hidden transform transition-all",
            message: null,
            description: (
              <div className="p-4 bg-gradient-to-br from-[rgba(16,185,129,0.15)] to-transparent">
                <div className="flex items-center gap-2 mb-3">
                  <div className="h-7 w-7 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <AudioOutlined className="text-emerald-400 text-sm" />
                  </div>
                  <div className="text-sm font-semibold text-emerald-400">
                    {getUserName(payload.requestedBy)} <span className="text-white/60 font-medium">muốn thêm bài hát</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-black/40 rounded-xl p-2.5 border border-white/5">
                  <img src={payload.songId?.imageUrl} alt={payload.songId?.name} className="h-12 w-12 rounded-lg object-cover shadow-md" />
                  <div className="min-w-0 flex-1">
                    <div className="font-bold text-white text-[14px] truncate">{payload.songId?.name}</div>
                    <div className="text-xs text-white/50 truncate mt-0.5">{payload.songId?.artistId?.name}</div>
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                    <Button type="primary" className="flex-1 bg-emerald-500 hover:!bg-emerald-400 border-none font-semibold h-9 rounded-lg" onClick={() => { handleResolveRequest(payload._id, RoomQueueItemStatus.APPROVED); notifyApi.destroy(payload._id); }}>
                      Chấp nhận
                    </Button>
                    <Button className="flex-1 bg-white/5 hover:!bg-rose-500 hover:!text-white hover:!border-rose-500 border-white/10 text-white/70 font-semibold h-9 rounded-lg transition-all" onClick={() => { handleResolveRequest(payload._id, RoomQueueItemStatus.REJECTED); notifyApi.destroy(payload._id); }}>
                      Từ chối
                    </Button>
                </div>
              </div>
            ),
          });
        }
      },
      PARTICIPANT_MODERATED: (payload: { userId: string; action: RoomModerationAction; reason?: string }) => {
        setParticipants((prev) => prev.filter((item) => getUserId(item.userId) !== payload.userId));
        setActivityFeed((prev) => [
          createRealtimeMessage("moderation", `Mot thanh vien vua bi ${payload.action === RoomModerationAction.KICK ? "kick" : "ban"} khoi phong.`),
          ...prev,
        ].slice(0, 30));

        if (payload.userId === currentUser?.sub) {
          const nextStatus = payload.action === RoomModerationAction.BAN ? RoomParticipantStatus.BANNED : RoomParticipantStatus.KICKED;
          setModerationState(nextStatus);
          setModerationReason(payload.reason || "");
          if (typeof window !== "undefined") {
            window.localStorage.setItem(`${moderationStoragePrefix}${roomId}`, JSON.stringify({ status: nextStatus, reason: payload.reason || "" }));
          }
        }
      },
      PLAYER_STATE_SYNC: (payload: Partial<RoomDetail>) => {
        setRoom((prev) => mergeRoomState(prev, payload));
        queryClient.setQueryData([ROOM_QUERY_KEY, roomId], (old: any) => ({
          ...old,
          ...payload, // Chứa currentSongId, currentQueueItemId, isPlaying mới
        }));
      },
      HOST_CONTROL: (payload: { action: RoomControlAction; room: Partial<RoomDetail>; queueItem?: RoomQueueItem | null }) => {
        setRoom((prev) => {
          if (!prev) return prev;
          const nextQueue = payload.queueItem ? upsertQueueItem(prev.queue, payload.queueItem) : prev.queue;
          const nextPayload = { ...payload.room, queue: nextQueue };
          return mergeRoomState(prev, nextPayload);
        });
        setActivityFeed((prev) => [
          createRealtimeMessage("playerSync", `Chu phong vua thuc hien lenh ${payload.action}.`),
          ...prev,
        ].slice(0, 30));
      },
    }),
    [currentUser?.sub, handleResolveRequest, isHost, notifyApi, roomId, queryClient]);



  useRoomSocket(roomId, roomSocketHandlers);

  if (roomLoading || !room) {
    return (
      <Loading />
    );
  }

  if (moderationState === RoomParticipantStatus.KICKED || moderationState === RoomParticipantStatus.BANNED) {
    return (
      <div className="flex h-full items-center justify-center p-6">
        <div className="max-w-lg rounded-[32px] border border-rose-400/20 bg-[rgba(18,18,18,0.72)] p-8 text-center text-white shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl">
          <div className="text-sm font-semibold uppercase tracking-[0.3em] text-rose-300">
            Truy cập bị từ chối
          </div>

          <h1 className="mt-3 text-3xl font-black">
            {moderationState === RoomParticipantStatus.BANNED
              ? "Bạn đã bị cấm tham gia phòng"
              : "Bạn đã bị mời ra khỏi phòng"}
          </h1>

          <p className="mt-4 leading-relaxed text-white/65">
            {moderationReason || (
              moderationState === RoomParticipantStatus.BANNED
                ? "Bạn không thể tiếp tục tham gia phòng này do vi phạm quy định cộng đồng."
                : "Bạn đã bị loại khỏi phiên nghe nhạc này bởi chủ phòng hoặc người quản trị."
            )}
          </p>

          <div className="mt-8 flex justify-center">
            <Button type="primary" className="bg-emerald-500" onClick={() => router.push("/room")}>Quay ve danh sach phong</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {notifyContextHolder}
      <div className="flex h-full flex-col bg-black text-white">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b px-4 py-4 backdrop-blur-xl md:px-6">
          <div className="flex items-center gap-3">
            <Button icon={<ArrowLeftOutlined />} onClick={() => router.push("/room")} className="bg-emerald-500 border-none">Danh sách phòng</Button>
            {!isHost && isAuthenticated ? <Button danger onClick={() => setShowLeaveConfirm(true)}>Rời phòng</Button> : null}
          </div>
          <div className="flex items-center gap-3">
            <RoomStatusChip status={room.status} />
            <div className="rounded-full border border-[rgba(37,162,106,0.22)] bg-[rgba(18,18,18,0.6)] px-4 py-2 text-sm text-white/85 backdrop-blur-md">
              {participants.length} người nghe
            </div>
          </div>
        </div>

        <div className="grid min-h-0 flex-1 gap-0 xl:grid-cols-[1.6fr_0.9fr]">
          <RoomDetailLeftPanel
            room={room}
            isHost={isHost}
            playbackSeconds={playbackSeconds}
            durationSeconds={durationSeconds}
            visibleQueue={visibleQueue}
            requestQueue={requestQueue}
            selectedQueueItemId={selectedQueueItemId}
            selectedQueueItem={selectedQueueItem}
            audioRef={audioRef}
            setAudioElement={setAudioElement}
            setSelectedQueueItemId={setSelectedQueueItemId}
            emitHostControl={emitHostControl}
            handleResolveRequest={handleResolveRequest}
            onPlayerListen={handlePlayerListen}
            onPlayerDurationChange={handlePlayerDurationChange}
            onPlayerPlay={handlePlayerPlay}
            onPlayerPause={handlePlayerPause}
            onPlayerSeek={handlePlayerSeek}
            onPlayerEnded={handlePlayerEnded}
          />

          <RoomDetailRightPanel
            isHost={isHost}
            messageLoading={messageLoading}
            messages={messages}
            activityFeed={activityFeed}
            participants={participants}
            commentInput={commentInput}
            requestKeyword={requestKeyword}
            requestSongs={requestSongs}
            requestSearching={requestSearching}
            requestingSongId={requestingSongId}
            setCommentInput={setCommentInput}
            emitComment={emitComment}
            handleModerate={handleModerate}
            setRequestKeyword={setRequestKeyword}
            setRequestSearchKeyword={setRequestSearchKeyword}
            handleRequestSong={handleRequestSong}
          />
        </div>

        <Modal open={showLeaveConfirm} onCancel={() => setShowLeaveConfirm(false)} onOk={() => router.push("/room")} okText="Rời phòng" cancelText="Hủy">
          <p>Bạn có chắc chắn muốn rời khỏi phòng này không?</p>
        </Modal>
      </div>
    </>
  );
}
