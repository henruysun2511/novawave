import { useToast } from "@/libs/toast";
import { useAdvertisementDetail } from "@/queries/useAdvertisementQuery";
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
  const toast = useToast();

  const { isPlaying, play, pause, status } = usePlayerStore();
  const { nowPlaying } = status;

  //Lấy type hiện tại: 'song' hoặc 'advertisement'
  const nowPlayingType = usePlayerStore(state => state.status.nowPlayingType);
  const isCurrentAd = nowPlayingType === 'advertisement';



  // 1. Lấy chi tiết bài hát (chỉ chạy nếu type là 'song')
  const { data: songRes, isLoading: songLoading } = useSongDetail(
    nowPlaying && !isCurrentAd ? nowPlaying : ""
  );
  const currentSong = songRes?.data;

  // 2. Lấy chi tiết quảng cáo (chỉ chạy nếu type là 'advertisement')
  const { data: adRes, isLoading: adLoading } = useAdvertisementDetail(
    nowPlaying && isCurrentAd ? nowPlaying : ""
  );
  const currentAd = adRes?.data;
  console.log(currentAd)

  // 3. Fetch chi tiết nghệ sĩ (chỉ chạy khi là bài hát)
  const artistId =
    typeof currentSong?.artistId === "string" && !isCurrentAd ? currentSong.artistId : undefined;
  const { data: artistRes } = useArtistDetail(artistId);
  const currentArtist = artistRes?.data;


  const nextMutation = useNextSong();
  const previousMutation = usePreviousSong();
  const isSkipLoading = nextMutation.isPending || previousMutation.isPending;

  const handleNext = () => {
    if (isCurrentAd) {
      toast.info("Nghe nhạc free thì chịu nghe quảng cáo đi");
      return;
    }
    if (nowPlaying && !isSkipLoading && !isCurrentAd) { // Không next khi là QC
      nextMutation.mutate({ currentSongId: nowPlaying });
    }
  };

  const handlePrev = () => {
    if (isCurrentAd) {
      toast.info("Nghe nhạc free thì chịu nghe quảng cáo đi");
      return;
    }
    if (nowPlaying && !isSkipLoading && !isCurrentAd) { // Không previous khi là QC
      previousMutation.mutate({ currentSongId: nowPlaying });
    }
  };

  const handleEnded = () => {
    if (!nowPlaying || isSkipLoading) return;

    nextMutation.mutate({ currentSongId: nowPlaying });
  };

  // Dữ liệu cho phần hiển thị
  const displayImageUrl = isCurrentAd
    ? currentAd?.bannerUrl || "/images/ad-default.png"
    : currentSong?.imageUrl || "/images/song-default.png";

  const displayName = isCurrentAd
    ? currentAd?.title || "Quảng Cáo"
    : currentSong?.name || "Đang tải...";

  const displaySubText = isCurrentAd
    ? `Được tài trợ bởi ${currentAd?.partner || "..."}`
    : currentArtist?.name || "Đang tải nghệ sĩ...";

  const audioSource = isCurrentAd
    ? currentAd?.audioUrl
    : currentSong?.mp3Link;

  return (
    <div className="bg-black fixed bottom-0 right-0 w-full z-10 h-[64px] flex items-center px-4 text-white">
      <div className="w-[25%] flex gap-3.5 items-center">
        <img
          className="w-[50px] h-[50px] rounded-sm object-cover"
          src={displayImageUrl}
          alt={displayName}
        />
        <div>
          <h1 className="text-text-primary text-base font-bold">{displayName}</h1>
          <p className="text-text-secondary text-sm">{displaySubText}</p>
        </div>
      </div>

      {/* Audio player */}
      <div className="w-[50%]">
        <AudioPlayer
          src={audioSource}
          autoPlay={isPlaying}
          onPlay={play}
          onPause={pause}
          showSkipControls
          onClickNext={handleNext}
          onClickPrevious={handlePrev}
          onEnded={handleEnded}
          customProgressBarSection={isCurrentAd ? [] : undefined}
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