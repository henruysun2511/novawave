"use client";

import { formatTime } from "@/libs/fomat";
import { RoomMessage, RoomRealtimeNotification } from "@/types/object.type";
import { Avatar, Button, Input, Skeleton } from "antd";
import { getUserAvatar, getUserName } from "../room-detail-helpers";

interface CommentsPanelProps {
  messageLoading: boolean;
  messages: RoomMessage[];
  activityFeed: RoomRealtimeNotification[];
  commentInput: string;
  setCommentInput: (value: string) => void;
  emitComment: () => void;
}

export function CommentsPanel({
  messageLoading,
  messages,
  activityFeed,
  commentInput,
  setCommentInput,
  emitComment,
}: CommentsPanelProps) {
  return (
    <div className="flex h-[calc(100vh-250px)] flex-col gap-4">
      <div className="flex-1 space-y-3 overflow-y-auto pr-1 scrollbar-hidden">
        {/* Activity Feed (Thông báo hệ thống) */}
        {activityFeed.map((item) => (
          <div key={item.id} className="rounded-2xl border border-[rgba(37,162,106,0.18)] bg-[rgba(24,88,61,0.15)] p-3 text-sm text-white/75 backdrop-blur-md">
            <div>{item.message}</div>
            <div className="mt-2 text-xs text-white/45">{formatTime(item.createdAt)}</div>
          </div>
        ))}

        {messageLoading && <Skeleton active paragraph={{ rows: 4 }} className="px-2" />}

        {/* Messages List */}
        {messages.map((item) => (
          <div key={item._id} className="rounded-2xl border border-white/5 bg-white/[0.03] p-3 backdrop-blur-md hover:bg-white/[0.06] transition-colors">
            <div className="flex items-center gap-3">
              <Avatar src={getUserAvatar(item.userId)} className="border border-white/10">
                {getUserName(item.userId)[0]}
              </Avatar>
              <div className="min-w-0 flex-1">
                <div className="font-semibold text-white truncate text-[13px]">{getUserName(item.userId)}</div>
                <div className="text-[10px] text-white/40">{formatTime(item.createdAt)}</div>
              </div>
            </div>
            <div className="mt-2.5 text-sm text-white/80 leading-relaxed">{item.content}</div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="mt-auto flex gap-2 items-end bg-black/20 p-2 rounded-2xl border border-white/5">
        <Input.TextArea
          rows={2}
          value={commentInput}
          onChange={(e) => setCommentInput(e.target.value)}
          placeholder="Nhập nội dung tin nhắn..."
          className="!bg-transparent !border-none !text-white !shadow-none focus:!ring-0 resize-none scrollbar-hidden"
          onPressEnter={(e) => {
            if (!e.shiftKey) {
              e.preventDefault();
              emitComment();
            }
          }}
        />
        <Button 
          type="primary" 
          className="bg-emerald-500 h-10 px-6 rounded-xl font-bold shadow-lg shadow-emerald-500/20" 
          onClick={emitComment}
        >
          Gửi
        </Button>
      </div>
    </div>
  );
}