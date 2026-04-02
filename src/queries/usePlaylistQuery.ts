import { PlaylistService } from "@/services/playlist.service";
import { PaginationParam } from "@/types/param.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const PLAYLIST_QUERY_KEY = ["playlists"];

export const usePlaylistList = (params: PaginationParam) =>
    useQuery({
        queryKey: [...PLAYLIST_QUERY_KEY, params],
        queryFn: async () => (await PlaylistService.getList(params)).data,
    });

export const usePlaylistDetail = (id: string) =>
    useQuery({
        queryKey: [...PLAYLIST_QUERY_KEY, id],
        queryFn: async () => (await PlaylistService.getDetail(id)).data,
        enabled: !!id,
    });

export const useCreatePlaylist = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: PlaylistService.create,
        onSuccess: () =>
            qc.invalidateQueries({ queryKey: PLAYLIST_QUERY_KEY }),
    });
};

export const useUpdatePlaylist = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: string, data: any }) =>
            PlaylistService.update(id, data),
        onSuccess: () =>
            qc.invalidateQueries({ queryKey: PLAYLIST_QUERY_KEY }),
    });
};

export const useDeletePlaylist = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: PlaylistService.delete,
        onSuccess: () =>
            qc.invalidateQueries({ queryKey: PLAYLIST_QUERY_KEY }),
    });
};

export const useAddSongToPlaylist = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: ({ playlistId, songId }: { playlistId: string, songId: string }) =>
            PlaylistService.addSong(playlistId, songId),
        onSuccess: () =>
            qc.invalidateQueries({ queryKey: PLAYLIST_QUERY_KEY }),
    });
};

export const useRemoveSongFromPlaylist = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: ({ playlistId, songId }: { playlistId: string, songId: string }) =>
            PlaylistService.removeSong(playlistId, songId),
        onSuccess: () =>
            qc.invalidateQueries({ queryKey: PLAYLIST_QUERY_KEY }),
    });
};

export const usePlaylistsSong = (playlistId: string) =>
    useQuery({
        queryKey: [...PLAYLIST_QUERY_KEY, 'by-song', playlistId],
        queryFn: async () => (await PlaylistService.getPlaylistSong(playlistId)).data,
        enabled: !!playlistId, 
    });

export const useAdminPlaylistList = (params?: PaginationParam) =>
    useQuery({
        queryKey: [...PLAYLIST_QUERY_KEY, 'admin', params],
        queryFn: async () => (await PlaylistService.getAdminList(params)).data,
    });

export const useUserPlaylists = (params?: PaginationParam) =>
    useQuery({
        queryKey: [...PLAYLIST_QUERY_KEY, 'user', params],
        queryFn: async () => (await PlaylistService.getUserPlaylists(params)).data,
    });