import { RoomService } from "@/services/room.service";
import {
  AddRoomQueueItemDto,
  CreateRoomMessageDto,
  CreateRoomDto,
  ModerateRoomParticipantDto,
  SyncRoomPlaybackDto,
  UpdateRoomDto,
  UpdateRoomQueueItemDto
} from "@/types/body.type";
import { RoomParam } from "@/types/param.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const ROOM_QUERY_KEY = ["rooms"];
export const ROOM_MINE_QUERY_KEY = [...ROOM_QUERY_KEY, "mine"];
export const ROOM_QUEUE_QUERY_KEY = [...ROOM_QUERY_KEY, "queue"];
export const ROOM_MESSAGE_QUERY_KEY = [...ROOM_QUERY_KEY, "messages"];
export const ROOM_PARTICIPANT_QUERY_KEY = [...ROOM_QUERY_KEY, "participants"];

export const useRoomList = (params: RoomParam) =>
  useQuery({
    queryKey: [...ROOM_QUERY_KEY, params],
    queryFn: async () => (await RoomService.getList(params)).data,
  });

export const useMyRoomList = () =>
  useQuery({
    queryKey: ROOM_MINE_QUERY_KEY,
    queryFn: async () => (await RoomService.getMine()).data,
  });

export const useRoomDetail = (id: string) =>
  useQuery({
    queryKey: [...ROOM_QUERY_KEY, id],
    queryFn: async () => (await RoomService.getDetail(id)).data,
    enabled: !!id,
  });

export const useRoomQueue = (id: string) =>
  useQuery({
    queryKey: [...ROOM_QUEUE_QUERY_KEY, id],
    queryFn: async () => (await RoomService.getQueue(id)).data,
    enabled: !!id,
  });

export const useRoomMessages = (id: string, page = 1, size = 20) =>
  useQuery({
    queryKey: [...ROOM_MESSAGE_QUERY_KEY, id, page, size],
    queryFn: async () => (await RoomService.getMessages(id, page, size)).data,
    enabled: !!id,
  });

export const useRoomParticipants = (id: string) =>
  useQuery({
    queryKey: [...ROOM_PARTICIPANT_QUERY_KEY, id],
    queryFn: async () => (await RoomService.getParticipants(id)).data,
    enabled: !!id,
  });

export const useCreateRoomMessage = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: CreateRoomMessageDto }) => RoomService.createMessage(id, data),
    onSuccess: (_, variables) => {
      qc.invalidateQueries({ queryKey: [...ROOM_MESSAGE_QUERY_KEY, variables.id] });
    },
  });
};

export const useCreateRoom = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateRoomDto) => RoomService.create(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ROOM_QUERY_KEY });
      qc.invalidateQueries({ queryKey: ROOM_MINE_QUERY_KEY });
    },
  });
};

export const useUpdateRoom = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateRoomDto }) => RoomService.update(id, data),
    onSuccess: (_, variables) => {
      qc.invalidateQueries({ queryKey: ROOM_QUERY_KEY });
      qc.invalidateQueries({ queryKey: [...ROOM_QUERY_KEY, variables.id] });
      qc.invalidateQueries({ queryKey: ROOM_MINE_QUERY_KEY });
    },
  });
};

export const useDeleteRoom = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => RoomService.remove(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ROOM_QUERY_KEY });
      qc.invalidateQueries({ queryKey: ROOM_MINE_QUERY_KEY });
    },
  });
};

export const useJoinRoom = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => RoomService.join(id),
    onSuccess: (_, id) => {
      qc.invalidateQueries({ queryKey: [...ROOM_QUERY_KEY, id] });
      qc.invalidateQueries({ queryKey: ROOM_QUERY_KEY });
    },
  });
};

export const useLeaveRoom = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => RoomService.leave(id),
    onSuccess: (_, id) => {
      qc.invalidateQueries({ queryKey: [...ROOM_QUERY_KEY, id] });
      qc.invalidateQueries({ queryKey: ROOM_QUERY_KEY });
    },
  });
};

export const useAddRoomQueueItem = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: AddRoomQueueItemDto }) => RoomService.addQueueItem(id, data),
    onSuccess: (_, variables) => {
      qc.invalidateQueries({ queryKey: [...ROOM_QUERY_KEY, variables.id] });
      qc.invalidateQueries({ queryKey: [...ROOM_QUEUE_QUERY_KEY, variables.id] });
    },
  });
};

export const useUpdateRoomQueueItem = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      queueId,
      data,
    }: {
      id: string;
      queueId: string;
      data: UpdateRoomQueueItemDto;
    }) => RoomService.updateQueueItem(id, queueId, data),
    onSuccess: (_, variables) => {
      qc.invalidateQueries({ queryKey: [...ROOM_QUERY_KEY, variables.id] });
      qc.invalidateQueries({ queryKey: [...ROOM_QUEUE_QUERY_KEY, variables.id] });
    },
  });
};

export const useRemoveRoomQueueItem = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, queueId }: { id: string; queueId: string }) => RoomService.removeQueueItem(id, queueId),
    onSuccess: (_, variables) => {
      qc.invalidateQueries({ queryKey: [...ROOM_QUERY_KEY, variables.id] });
      qc.invalidateQueries({ queryKey: [...ROOM_QUEUE_QUERY_KEY, variables.id] });
    },
  });
};

export const useSyncRoomPlayback = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: SyncRoomPlaybackDto }) => RoomService.syncPlayback(id, data),
    onSuccess: (_, variables) => {
      qc.invalidateQueries({ queryKey: [...ROOM_QUERY_KEY, variables.id] });
      qc.invalidateQueries({ queryKey: [...ROOM_QUEUE_QUERY_KEY, variables.id] });
    },
  });
};

export const useModerateRoomParticipant = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      participantUserId,
      data,
    }: {
      id: string;
      participantUserId: string;
      data: ModerateRoomParticipantDto;
    }) => RoomService.moderateParticipant(id, participantUserId, data),
    onSuccess: (_, variables) => {
      qc.invalidateQueries({ queryKey: [...ROOM_QUERY_KEY, variables.id] });
      qc.invalidateQueries({ queryKey: [...ROOM_PARTICIPANT_QUERY_KEY, variables.id] });
    },
  });
};
