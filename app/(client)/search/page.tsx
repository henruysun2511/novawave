import { Tabs } from "antd";
import "./search.css";

export default function SearchPage() {
    const items = [
        { key: "all", label: "Tất cả" },
        { key: "song", label: "Bài hát" },
        { key: "artist", label: "Nghệ sĩ" },
        { key: "playlist", label: "Playlist" },
        { key: "album", label: "Album" },
        { key: "genre", label: "Thể loại" },
    ]

    return (
        <div className="p-6">
            <h1 className="text-xl text-text-primary font-bold mb-8">Kết quả tìm kiếm cho: Quân AP</h1>
            <Tabs
                items={items}
                defaultActiveKey="all"
                className="pill-tabs"
                tabBarGutter={12}
            />
        </div>

    )
}