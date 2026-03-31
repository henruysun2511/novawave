import { useToast } from "@/libs/toast";
import { useNextSong, usePreviousSong } from "@/queries/usePlayerQuery";
import { useIncrementSongView } from "@/queries/useSongQuery";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { useSidebarStore } from "@/stores/useSidebarStore";
import { PlaySongType } from "@/types/constant.type";
import { CloseOutlined, MenuFoldOutlined, UpSquareOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import { useEffect, useRef, useState } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import './song-bar.css';

export default function SongBar() {
  const showInfo = useSidebarStore((s) => s.showInfo);
  const showQueue = useSidebarStore((s) => s.showQueue);
  const hidePanel = useSidebarStore((s) => s.hideRightPanel);
  const toast = useToast();

  const { isPlaying, play, pause, status, setCurrentTime, setAudioRef, audioRef } = usePlayerStore();
  const { nowPlayingId, nowPlaying: currentData } = status;

  // Lấy type hiện tại: 'song' hoặc 'advertisement'
  const nowPlayingType = currentData?.type;
  const isCurrentAd = nowPlayingType === PlaySongType.ADVERTISEMENT;

  const currentSong = !isCurrentAd ? currentData : null;
  const currentAd = isCurrentAd ? currentData : null;
  const currentArtist = currentSong?.artistId; // Artist đã được populate từ backend

  // State để theo dõi xem view đã được ghi nhận chưa
  const [viewCounted, setViewCounted] = useState<string | null>(null);

  const nextMutation = useNextSong();
  const previousMutation = usePreviousSong();
  const { mutate: incrementView } = useIncrementSongView();
  const isSkipLoading = nextMutation.isPending || previousMutation.isPending;

  const handleNext = () => {
    if (isCurrentAd) {
      toast.info("Nghe nhạc free thì chịu nghe quảng cáo đi");
      return;
    }
    if (nowPlayingId && !isSkipLoading && !isCurrentAd) { // Không next khi là QC
      nextMutation.mutate({ currentSongId: nowPlayingId });
    }
  };

  const handlePrev = () => {
    if (isCurrentAd) {
      toast.info("Nghe nhạc free thì chịu nghe quảng cáo đi");
      return;
    }

    if (!nowPlayingId || isSkipLoading) return;

    // Logic: Nếu đã phát quá 3s → reset bài về 0. Nếu dưới 3s → về bài trước.
    const isPlayedLongEnough = usePlayerStore.getState().currentTime > 3;

    if (isPlayedLongEnough) {
      const audio = usePlayerStore.getState().audioRef;
      if (audio) {
        audio.currentTime = 0;
        setCurrentTime(0);
        return;
      }
    }

    previousMutation.mutate({ currentSongId: nowPlayingId });
  };

  const handleEnded = () => {
    if (!nowPlayingId || isSkipLoading) return;

    nextMutation.mutate({ currentSongId: nowPlayingId });
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

  const playerRef = useRef(null);


  useEffect(() => {
    const playerInstance = playerRef.current as any;

    if (playerInstance && playerInstance.audio && playerInstance.audio.current) {
      const audioElement = playerInstance.audio.current;
      setAudioRef(audioElement);

      return () => {
        setAudioRef(null); // Cleanup khi component unmount
      }
    }
  }, [setAudioRef, audioSource]);

  // Reset viewCounted khi bài hát thay đổi
useEffect(() => {
    // Reset lại trạng thái tính view mỗi khi ID bài hát thay đổi
    if (nowPlayingId) {
        setViewCounted(null);
    }
}, [nowPlayingId]);

  const handleListen = (e: any) => {
    if (isCurrentAd) return;
    if (!audioSource) return;
    
    const currentTime = e.target.currentTime;

    if (!isCurrentAd && currentTime >= 30 && viewCounted !== nowPlayingId) {
        incrementView(nowPlayingId);
        setViewCounted(nowPlayingId); // Đánh dấu ID bài hát đã được tính
    }
  };

  // Thêm listener cho sự kiện timeupdate để đảm bảo sync với WavePlayer
  useEffect(() => {
    const audio = audioRef;
    if (!audio) return;

    const handleTimeUpdate = () => {
      if (isCurrentAd) return;
      setCurrentTime(audio.currentTime);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [audioRef, isCurrentAd, setCurrentTime]);

  // Đảm bảo bài hát luôn được phát khi source thay đổi (giúp chuyển bài mượt hơn)
  useEffect(() => {
    if (isPlaying && audioRef && audioSource) {
      const playPromise = audioRef.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn("Autoplay was prevented or interrupted:", err);
        });
      }
    }
  }, [audioSource, isPlaying, audioRef]);

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
          ref={playerRef}
          src={audioSource}
          autoPlay={isPlaying}
          onPlay={play}
          onPause={pause}
          showSkipControls
          onClickNext={handleNext}
          onClickPrevious={handlePrev}
          onEnded={handleEnded}
          onListen={handleListen}
          className={`custom-audio-player ${isCurrentAd ? 'ad-mode' : ''}`}
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