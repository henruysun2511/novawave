"use client";

import { EmptyRoomState } from "@/components/client/Room/room-ui";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Skeleton } from "antd";
import { SearchSongItem } from "../room-detail-helpers";

interface SongSearchPanelProps {
  requestKeyword: string;
  setRequestKeyword: (value: string) => void;
  setRequestSearchKeyword: (value: string) => void;
  requestSearching: boolean;
  requestSongs: SearchSongItem[];
  addingQueueItem: boolean;
  handleRequestSong: (songId: string) => void;
  actionLabel: string;
  placeholder: string;
  emptyTitle: string;
}

export function SongSearchPanel({
  requestKeyword,
  setRequestKeyword,
  setRequestSearchKeyword,
  requestSearching,
  requestSongs,
  addingQueueItem,
  handleRequestSong,
  actionLabel,
  placeholder,
  emptyTitle,
}: SongSearchPanelProps) {
  return (
    <div className="flex h-[calc(100vh-250px)] flex-col gap-5">
      <Input
        allowClear
        size="large"
        value={requestKeyword}
        onChange={(e) => setRequestKeyword(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && setRequestSearchKeyword(requestKeyword)}
        prefix={<SearchOutlined className="text-emerald-500" />}
        placeholder={placeholder}
        className="custom-search-input !rounded-2xl !bg-white/5 !border-white/10 !text-white"
      />

      <div className="flex-1 space-y-3 overflow-y-auto pr-1 scrollbar-hidden">
        {requestSearching ? (
          <Skeleton active avatar paragraph={{ rows: 3 }} className="p-4" />
        ) : requestSongs.length > 0 ? (
          requestSongs.map((song) => (
            <div key={song._id} className="group flex items-center gap-4 rounded-2xl border border-white/5 bg-white/[0.03] p-3 transition-all hover:bg-white/[0.08] hover:border-white/20">
              <div className="relative overflow-hidden rounded-xl">
                <img src={song.imageUrl} alt={song.name} className="h-14 w-14 object-cover transition-transform group-hover:scale-110" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate font-bold text-white text-[15px]">{song.name}</div>
                <div className="truncate text-xs text-white/45 mt-0.5">{song.artistId?.name}</div>
              </div>
              <Button 
                type="primary" 
                className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:!bg-emerald-500 hover:!text-white font-bold rounded-xl"
                loading={addingQueueItem} 
                onClick={() => handleRequestSong(song._id)}
              >
                {actionLabel}
              </Button>
            </div>
          ))
        ) : (
          <div className="mt-10">
            <EmptyRoomState title={emptyTitle} />
          </div>
        )}
      </div>
    </div>
  );
}