import SearchAlbumTab from "./search-album-tabs";
import SearchArtistTab from "./search-artist-tab";
import SearchGenreTab from "./search-genre-tab";
import SearchPlaylistTab from "./search-playlist-tab";
import { SearchSongTab } from "./search-song-tabs";

interface Props {
  data: {
    songs: any[];
    artists: any[];
    albums: any[];
    playlists: any[];
    genres: any[];
  };
}

export default function SearchAllTab({ data }: Props) {
  return (
    <div className="flex flex-col gap-10">

      {data.songs.length > 0 && (
        <section>
          <h2 className="text-lg font-bold text-white mb-3">Bài hát</h2>
          <SearchSongTab songs={data.songs.slice(0, 5)} />
        </section>
      )}

      {data.artists.length > 0 && (
        <section>
          <h2 className="text-lg font-bold text-white mb-3">Nghệ sĩ</h2>
          <SearchArtistTab artists={data.artists.slice(0, 5)} />
        </section>
      )}

      {data.albums.length > 0 && (
        <section>
          <h2 className="text-lg font-bold text-white mb-3">Album</h2>
          <SearchAlbumTab albums={data.albums.slice(0, 3)} />
        </section>
      )}

      {data.playlists.length > 0 && (
        <section>
          <h2 className="text-lg font-bold text-white mb-3">Playlist</h2>
          <SearchPlaylistTab playlists={data.playlists.slice(0, 3)} />
        </section>
      )}

      {data.genres.length > 0 && (
        <section>
          <h2 className="text-lg font-bold text-white mb-3">Thể loại</h2>
          <SearchGenreTab genres={data.genres.slice(0, 6)} />
        </section>
      )}
    </div>
  );
}