import { MenuFoldOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";

export default function SongBar({
  togglePlayingView
}: {
  togglePlayingView: () => void;
}) {
  return (
    <div className="bg-black fixed bottom-0 right-0 w-full z-10 py-3.5 text-center text-white">
      Thanh phát nhạc ở đây
      <Tooltip title="Chế độ xem Đang phát" placement="right">
        <MenuFoldOutlined
          className="absolute top-5 left-5 z-10 text-white cursor-pointer"
          onClick={togglePlayingView} 
        />
      </Tooltip>
    </div>
  );
}