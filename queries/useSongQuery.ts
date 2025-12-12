import { SongService } from "@/services/song.service";
import { SongParam } from "@/types/param.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const SONG_QUERY_KEY = ["songs"];

export const useSongList = (params: SongParam) =>
    useQuery({
        queryKey: [...SONG_QUERY_KEY, params],
        queryFn: async () => (await SongService.getList(params)).data,
    });

export const useSongDetail = (id: string) =>
    useQuery({
        queryKey: [...SONG_QUERY_KEY, id],
        queryFn: async () => (await SongService.getDetail(id)).data,
        enabled: !!id,
    });

const songMutation = (fn: any) => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: fn,
        onSuccess: () => qc.invalidateQueries({ queryKey: SONG_QUERY_KEY }),
    });
};

export const useCreateSong = () => songMutation(SongService.create);
export const useUpdateSong = () =>
    songMutation(({ id, data }: any) => SongService.update(id, data));
export const useDeleteSong = () => songMutation(SongService.delete);
export const useUpdateSongStatus = () =>
    songMutation(SongService.updateStatus);