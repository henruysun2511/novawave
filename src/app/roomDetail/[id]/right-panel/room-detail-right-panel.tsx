"use client";

import {
  RoomModerationAction
} from "@/types/constant.type";
import { RoomMessage, RoomParticipant, RoomRealtimeNotification } from "@/types/object.type";
import {
  AudioOutlined,
  CommentOutlined,
  PlusOutlined,
  TeamOutlined
} from "@ant-design/icons";
import { Tabs } from "antd";
import { SearchSongItem } from "../room-detail-helpers";
import { CommentsPanel } from "./room-comment-panel";
import { MembersPanel } from "./room-member-panel";
import { SongSearchPanel } from "./room-song-search-panel";

interface RoomDetailRightPanelProps {
  isHost: boolean;
  messageLoading: boolean;
  messages: RoomMessage[];
  activityFeed: RoomRealtimeNotification[];
  participants: RoomParticipant[];
  commentInput: string;
  requestKeyword: string;
  requestSongs: SearchSongItem[];
  requestSearching: boolean;
  requestingSongId: string | null;
  setCommentInput: (value: string) => void;
  emitComment: () => void;
  handleModerate: (participantUserId: string, action: RoomModerationAction) => void;
  setRequestKeyword: (value: string) => void;
  setRequestSearchKeyword: (value: string) => void;
  handleRequestSong: (songId: string) => void;
}



export function RoomDetailRightPanel(props: RoomDetailRightPanelProps) {
  const isHost = props.isHost;

  const items = isHost 
    ? [
        {
          key: "comments",
          label: <span><CommentOutlined /> Bình luận</span>,
          children: (
            <CommentsPanel 
              {...props} 
            />
          ),
        },
        {
          key: "members",
          label: <span><TeamOutlined /> Thành viên</span>,
          children: (
            <MembersPanel 
              participants={props.participants} 
              handleModerate={props.handleModerate} 
              isHost={isHost}
            />
          ),
        },
        {
          key: "add-song",
          label: <span><PlusOutlined /> Thêm bài</span>,
          children: (
            <SongSearchPanel
              {...props}
              actionLabel="Thêm"
              placeholder="Tìm bài hát..."
              emptyTitle="Nhập tên bài hát để thêm vào hàng đợi."
            />
          ),
        },
      ]
    : [
        {
          key: "comments",
          label: <span><CommentOutlined /> Bình luận</span>,
          children: <CommentsPanel {...props} />,
        },
        {
          key: "request",
          label: <span><AudioOutlined /> Yêu cầu nhạc</span>,
          children: (
            <SongSearchPanel
              {...props}
              actionLabel="Gửi yêu cầu"
              placeholder="Yêu cầu bài hát..."
              emptyTitle="Gửi yêu cầu bài hát cho chủ phòng."
            />
          ),
        },
      ];

  return (
    <aside className="flex min-h-0 flex-col">
      <div className="min-h-0 flex-1 p-4 md:p-6">
        <div className="h-full rounded-[32px] border border-white/10 bg-[rgba(18,18,18,0.62)] p-4 shadow-2xl backdrop-blur-xl">
          <Tabs
            className="custom-room-tabs"
            defaultActiveKey="comments"
            items={items}
          />
        </div>
      </div>
    </aside>
  );
}
