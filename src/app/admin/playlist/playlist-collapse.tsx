import { Playlist } from "@/types/object.type";
import { Collapse } from "antd";
import PlaylistSongList from "../../../components/client/Playlist/playlist-song-list";
import "./collapse.css";
import PlaylistHeader from "./playlist-header";

interface PlaylistCollapseProps {
    playlists: Playlist[];
}

export default function PlaylistCollapse({ playlists }: PlaylistCollapseProps) {
    return (
        <Collapse accordion>
            {playlists.map((playlist) => (
                <Collapse.Panel
                    key={playlist._id}
                    header={<PlaylistHeader playlist={playlist} />}
                    className="playlist-collapse"
                >
                    <PlaylistSongList playlistId={playlist._id} />
                </Collapse.Panel>
            ))}
        </Collapse>
    );
}