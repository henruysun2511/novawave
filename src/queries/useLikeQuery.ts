import { LikeService } from "@/services/like.service";
import { PaginationParam } from "@/types/param.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const LIKE_QUERY_KEY = ["likes"];

export const useLikeSong = () => {
    const qc = useQueryClient();

    return useMutation({
        mutationFn: (songId: string) => LikeService.like(songId),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: LIKE_QUERY_KEY });
        },
    });
};

export const useUnlikeSong = () => {
    const qc = useQueryClient();

    return useMutation({
        mutationFn: (songId: string) => LikeService.unlike(songId),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: LIKE_QUERY_KEY });
        },
    });
};

export const useUserLike = (params: PaginationParam) =>
    useQuery({
        queryKey: [...LIKE_QUERY_KEY, params],
        queryFn: async () =>
            (await LikeService.getUserLike(params)).data,
    });