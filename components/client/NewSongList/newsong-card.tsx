import { useStartPlayer } from "@/queries/usePlayerQuery";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { Song } from "@/types/object.type";
import { CaretRightFilled, LoadingOutlined } from "@ant-design/icons";

interface Props {
    song: Song;
    isCurrentSong: boolean;
    fullQueueIds: string[];
    onPlay?: () => void;
}

export default function NewSongCard({ song, isCurrentSong, fullQueueIds, onPlay }: Props) {
    const { isPlaying, play, pause } = usePlayerStore();
    const { mutate: startPlayer } = useStartPlayer();

    const handleCardClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();

        if (isCurrentSong) {
            if (isPlaying) pause();
            else play();
            return;
        }

        if (onPlay) {
            onPlay();
        } else {
            startPlayer({ songId: song._id });
        }
    };


    const artistName = (song?.artistId as any)?.name || song?.artist?.name || "Đang cập nhật";
    
    const baseClasses = "group flex items-center cursor-pointer my-2 w-full rounded-xl p-2 transition";
    const playingClasses = isCurrentSong ? "bg-green/20" : "hover:bg-[var(--background-tertiary)]";
    const textClasses = isCurrentSong ? "text-green" : "text-text-primary";

    return (
        <div 
            className={`${baseClasses} ${playingClasses}`}
            onClick={handleCardClick}
        >
            <div className="relative w-[70px] h-[70px] flex-shrink-0">
                <img
                    className="w-full h-full object-cover rounded"
                    src={song?.imageUrl || "/images/default-cover.png"}
                    alt={song?.name}
                />

                <div 
                    className={`absolute inset-0 flex items-center justify-center bg-black/40 rounded transition 
                                opacity-0 group-hover:opacity-100 ${isCurrentSong ? '!opacity-100' : ''}`
                    }
                >
                    {isCurrentSong && isPlaying ? (
                         <span className="text-white text-base font-bold">||</span>
                    ) : (
                        <div className="w-8 h-8 rounded-full bg-green flex items-center justify-center shadow-lg">
                            <CaretRightFilled className="text-xs text-black" />
                        </div>
                    )}
                </div>
            </div>

            <div className="flex flex-col justify-center ml-4 overflow-hidden">
                <span 
                    className={`text-base font-bold truncate ${textClasses}`}
                    title={song?.name}
                >
                    {song?.name}
                </span>
                <span className="text-sm text-gray-400 truncate" title={artistName}>
                    {artistName}
                </span>
            </div>
            
            {isCurrentSong && (
                <div className="ml-auto flex-shrink-0">
                    <span className="text-green text-xs font-bold">Đang Phát</span>
                </div>
            )}
        </div>
    );
}