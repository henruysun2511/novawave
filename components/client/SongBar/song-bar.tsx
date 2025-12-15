import { useArtistDetail } from "@/queries/useArtistQuery";
import { useNextSong, usePreviousSong } from "@/queries/usePlayerQuery";
import { useSongDetail } from "@/queries/useSongQuery";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { useSidebarStore } from "@/stores/useSidebarStore";
import { CloseOutlined, MenuFoldOutlined, UpSquareOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import './song-bar.css';

export default function SongBar() {
  const showInfo = useSidebarStore((s) => s.showInfo);
  const showQueue = useSidebarStore((s) => s.showQueue);
  const hidePanel = useSidebarStore((s) => s.hideRightPanel);

  const { isPlaying, play, pause, status } = usePlayerStore();
  const { nowPlaying } = status;
  console.log("now playin" + nowPlaying)

  // 1. Lấy chi tiết bài hát đang phát
  // Chạy query chỉ khi nowPlaying có giá trị
  const { data: songRes, isLoading: songLoading } = useSongDetail(nowPlaying ?? "");
  const currentSong = songRes?.data;
  console.log(currentSong)

  // 2. Lấy chi tiết nghệ sĩ
  const artistId =
    typeof currentSong?.artistId === "string" ? currentSong.artistId : undefined;

  const { data: artistRes } = useArtistDetail(artistId);
  const currentArtist = artistRes?.data;
  console.log(currentArtist)

  // 3. Khai báo Mutations
  const nextMutation = useNextSong();
  const previousMutation = usePreviousSong();

  const isSkipLoading = nextMutation.isPending || previousMutation.isPending;

  const handleNext = () => {
    if (nowPlaying && !isSkipLoading) {
      nextMutation.mutate({ currentSongId: nowPlaying });
    }
  };

  const handlePrev = () => {
    if (nowPlaying && !isSkipLoading) {
      previousMutation.mutate({ currentSongId: nowPlaying });
    }
  };

  return (
    <div className="bg-black fixed bottom-0 right-0 w-full z-10 h-[64px] flex items-center px-4 text-white">
      <div className="w-[25%] flex gap-3.5 items-center">
        <img className="w-[50px] h-[50px] rounded-sm" src={currentSong?.imageUrl} alt="" />
        <div>
          <h1 className="text-text-primary text-base font-bold">{currentSong?.name}</h1>
          <p className="text-text-secondary text-sm">{currentArtist?.name}</p>
        </div>
      </div>
      {/* Audio player */}
      <div className="w-[50%]">
        <AudioPlayer
          // ✅ SỬ DỤNG LINK BÀI HÁT TỪ QUERY
          src={currentSong?.mp3Link}
          // autoPlay sẽ tự động là true nếu isPlaying là true
          autoPlay={isPlaying}
          onPlay={play}
          onPause={pause}
          // Hiển thị nút next/prev
          showSkipControls
          // Gọi hàm mutation
          onClickNext={handleNext}
          onClickPrevious={handlePrev}
          className="custom-audio-player"
        />
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-4 ml-4 w-[25%] justify-end">
        <Tooltip title="Chế độ xem Đang phát">
          <MenuFoldOutlined
            className="cursor-pointer text-lg"
            onClick={showInfo}
          />
        </Tooltip>

        <Tooltip title="Hàng đợi">
          <UpSquareOutlined
            className="cursor-pointer text-lg"
            onClick={showQueue}
          />
        </Tooltip>

        <Tooltip title="Ẩn">
          <CloseOutlined
            className="cursor-pointer text-lg"
            onClick={hidePanel}
          />
        </Tooltip>
      </div>
    </div>
  );
}