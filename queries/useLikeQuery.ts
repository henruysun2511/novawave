import { LikeService } from "@/services/like.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const LIKE_QUERY_KEY = ["likes"];

export const useLike = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: LikeService.like,
        onSuccess: () => {
            qc.invalidateQueries();
        },
    });
};

export const useUnlike = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: LikeService.unlike,
        onSuccess: () => {
            qc.invalidateQueries();
        },
    });
};