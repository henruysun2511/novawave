import { PlaylistService } from "@/services/playlist.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const PLAYLIST_QUERY_KEY = ["playlists"];

export const usePlaylistList = () =>
    useQuery({
        queryKey: PLAYLIST_QUERY_KEY,
        queryFn: async () => (await PlaylistService.getList()).data,
    });

export const usePlaylistDetail = (id: string) =>
    useQuery({
        queryKey: [...PLAYLIST_QUERY_KEY, id],
        queryFn: async () => (await PlaylistService.getDetail(id)).data,
        enabled: !!id,
    });

const playlistMutation = (fn: any) => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: fn,
        onSuccess: () =>
            qc.invalidateQueries({ queryKey: PLAYLIST_QUERY_KEY }),
    });
};

export const useCreatePlaylist = () =>
    playlistMutation(PlaylistService.create);
export const useUpdatePlaylist = () =>
    playlistMutation(({ id, data }: any) =>
        PlaylistService.update(id, data)
    );
export const useDeletePlaylist = () =>
    playlistMutation(PlaylistService.delete);

export const useAddSongToPlaylist = () =>
    playlistMutation(({ playlistId, songId }: any) =>
        PlaylistService.addSong(playlistId, songId)
    );

export const useRemoveSongFromPlaylist = () =>
    playlistMutation(({ playlistId, songId }: any) =>
        PlaylistService.removeSong(playlistId, songId)
    );