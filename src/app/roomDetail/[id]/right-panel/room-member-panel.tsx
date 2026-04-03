"use client";

import { ParticipantStatusTag } from "@/components/client/Room/room-ui";
import { formatTime } from "@/libs/fomat";
import { RoomModerationAction, RoomParticipantRole } from "@/types/constant.type";
import { RoomParticipant } from "@/types/object.type";
import { CrownOutlined, StopOutlined, UserDeleteOutlined } from "@ant-design/icons";
import { Avatar, Button } from "antd";
import { getUserAvatar, getUserId, getUserName } from "../room-detail-helpers";

interface MembersPanelProps {
  participants: RoomParticipant[];
  handleModerate: (participantUserId: string, action: RoomModerationAction) => void;
  isHost: boolean; // Để biết người đang xem có phải host không
}

export function MembersPanel({ participants, handleModerate, isHost }: MembersPanelProps) {
  return (
    <div className="flex h-[calc(100vh-250px)] flex-col gap-4">
      <div className="space-y-3 overflow-y-auto pr-1 scrollbar-hidden">
        {participants.map((participant) => {
          const participantUserId = getUserId(participant.userId);
          const isParticipantHost = participant.role === RoomParticipantRole.HOST;
          
          return (
            <div key={participant._id} className="group rounded-2xl border border-white/5 bg-white/[0.03] p-4 backdrop-blur-md transition-all hover:border-white/10">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar size="large" src={getUserAvatar(participant.userId)} className="border border-white/10">
                      {getUserName(participant.userId)[0]}
                    </Avatar>
                    {isParticipantHost && (
                      <div className="absolute -top-1 -right-1 bg-yellow-500 rounded-full p-0.5 text-[8px] text-black shadow-lg">
                        <CrownOutlined />
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="font-bold text-white text-sm flex items-center gap-2">
                      {getUserName(participant.userId)}
                      <ParticipantStatusTag status={participant.status} />
                    </div>
                    <div className="text-[11px] text-white/40 font-medium">
                      Tham gia lúc {formatTime(participant.joinedAt)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons (Only visible to host and for non-host members) */}
              {isHost && !isParticipantHost && participantUserId && (
                <div className="mt-4 flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button 
                    size="small" 
                    icon={<UserDeleteOutlined />} 
                    className="rounded-lg bg-white/5 border-none text-white/70 hover:!bg-orange-500 hover:!text-white"
                    onClick={() => handleModerate(participantUserId, RoomModerationAction.KICK)}
                  >
                    Kick
                  </Button>
                  <Button 
                    size="small" 
                    danger 
                    icon={<StopOutlined />} 
                    className="rounded-lg border-rose-500/20 bg-rose-500/5 hover:!bg-rose-600"
                    onClick={() => handleModerate(participantUserId, RoomModerationAction.BAN)}
                  >
                    Ban
                  </Button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}