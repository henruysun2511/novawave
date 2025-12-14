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
  console.log(status)
  const { nowPlaying } = status;
  console.log(nowPlaying)
  
  // Lấy chi tiết bài hát đang phát (ApiResponse<Song>)
  const { data: songRes } = useSongDetail(nowPlaying ?? "");
  const currentSong = songRes?.data; 
  console.log(currentSong)
  
  // Lấy chi tiết nghệ sĩ
  const artistId =
  typeof currentSong?.artistId === "string" ? currentSong.artistId : undefined;

  const { data: artistRes } = useArtistDetail(artistId);
  const currentArtist = artistRes?.data;
  
  // Mutations
  const nextMutation = useNextSong();
  const previousMutation = usePreviousSong();

  // Logic chuyển bài
  const handleNext = () => {
      if (nowPlaying) { 
          // Gọi mutation, truyền ID hiện tại
          nextMutation.mutate({ currentSongId: nowPlaying }); 
      }
  };

  const handlePrev = () => {
      if (nowPlaying) {
          // Gọi mutation, ID vẫn được truyền trong payload
          // (Dù PlayerService.previous không sử dụng, nhưng giúp call site nhất quán)
          previousMutation.mutate({ currentSongId: nowPlaying }); 
      }
  };

  return (
    <div className="bg-black fixed bottom-0 right-0 w-full z-10 h-[64px] flex items-center px-4 text-white">
      <div className="w-[25%] flex gap-3.5 items-center">
        <img className="w-[50px] h-[50px] rounded-sm" src="https://scontent.fhan14-3.fna.fbcdn.net/v/t39.30808-6/586035192_1273607148097358_8525743571189677196_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeHGFtELgI8OcgMlmx8ibFHWKIyVZ3lE1MwojJVneUTUzHTCdg-mQGbAHBY92cH94VRurEGz2n9mR6d5W0Mkcnw0&_nc_ohc=javoCmUvNLsQ7kNvwFe2VFX&_nc_oc=AdnPsSJjU5k0FNXckwdgZHxDv3XSsoL97zVPdEIQhjtUKHWB4dgWCaVWa-lX8PrPYIALzy72mXvpFiO-gaBYB_Nk&_nc_zt=23&_nc_ht=scontent.fhan14-3.fna&_nc_gid=_f1E57Mhd39fYSXdiRC07Q&oh=00_AfnJf7RkiVhe83fRj5q1YwF4qImA5qGb3Zz9a80Pe4lXiA&oe=693A46C8" alt="" />
        <div>
          <h1 className="text-text-primary text-base font-bold">Một nhà</h1>
          <p className="text-text-secondary text-sm">Khánh Lê</p>
        </div>
      </div>
      {/* Audio player */}
      <div className="w-[50%]">
        <AudioPlayer
          src={currentSong?.mp3Link} 
          autoPlay={isPlaying} 
          onPlay={play} // Cập nhật Zustand: isPlaying = true
          onPause={pause} // Cập nhật Zustand: isPlaying = false
          showSkipControls
          onClickNext={handleNext} // Gọi mutation chuyển bài
          onClickPrevious={handlePrev} // Gọi mutation chuyển bài
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