import { SongService } from "@/services/song.service";
import { LeaderboardType } from "@/types/object.type";
import { SongParam } from "@/types/param.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const SONG_QUERY_KEY = ["songs"];
export const SONG_ADMIN_QUERY_KEY = ["songs", "admin"];
export const TOP_SONGS_QUERY_KEY = [...SONG_QUERY_KEY, "top"];
export const LEADERBOARD_QUERY_KEY = [...SONG_QUERY_KEY, "leaderboard"];


export const useSongList = (params: SongParam) =>
    useQuery({
        queryKey: [...SONG_QUERY_KEY, params],
        queryFn: async () => (await SongService.getList(params)).data,
    });

export const useSongListByArtist = (artistId: string) =>
    useQuery({
        queryKey: [...SONG_QUERY_KEY, "artist", artistId],
        queryFn: async () => (await SongService.getListByArtist(artistId)).data,
        enabled: !!artistId,
    });

export const useSongListByAdmin = (params: SongParam) =>
    useQuery({
        queryKey: [...SONG_ADMIN_QUERY_KEY, params],
        queryFn: async () => (await SongService.getListByAdmin(params)).data,
    });

export const useSongDetail = (id: string) =>
    useQuery({
        queryKey: [...SONG_QUERY_KEY, id],
        queryFn: async () => (await SongService.getDetail(id)).data,
        enabled: !!id,
    });


export const useCreateSong = () => {
    const qc = useQueryClient();

    return useMutation({
        mutationFn: (data: any) => SongService.create(data),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: SONG_QUERY_KEY });
        },
    });
};

export const useUpdateSong = () => {
    const qc = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: any) => SongService.update(id, data),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: SONG_QUERY_KEY });
        },
    });
};

export const useDeleteSong = () => {
    const qc = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => SongService.delete(id),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: SONG_QUERY_KEY });
        },
    });
};

export const useDeleteSongByAdmin = () => {
    const qc = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => SongService.deleteByAdmin(id),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: SONG_ADMIN_QUERY_KEY });
        },
    });
};

export const useUpdateSongStatus = () => {
    const qc = useQueryClient();

    return useMutation({
        mutationFn: (data: any) => SongService.updateStatus(data),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: SONG_QUERY_KEY });
        },
    });
};

export const useTopSongs = () => {
    return useQuery({
        queryKey: TOP_SONGS_QUERY_KEY,
        queryFn: async () => {
            const response = await SongService.getTopSongs();
            return response.data;
        },
        staleTime: 1000 * 60 * 5, 
    });
};


// Hook tăng view
export const useIncrementSongView = () => {
    const qc = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => SongService.incrementViews(id),
        onSuccess: (res, id) => {
            // Cập nhật lại cache detail của bài hát đó nếu cần
            qc.invalidateQueries({ queryKey: [...SONG_QUERY_KEY, id] });
            // Không cần invalidate toàn bộ list để tránh load lại quá nhiều
        },
    });
};

// Hook lấy bảng xếp hạng
export const useSongLeaderboard = (type: LeaderboardType) => {
    return useQuery({
        queryKey: [...LEADERBOARD_QUERY_KEY, type],
        queryFn: async () => (await SongService.getLeaderboard(type)).data,
        staleTime: 1000 * 60 * 5, // Dữ liệu BXH có thể giữ cũ trong 5 phút để tối ưu performance
    });
};