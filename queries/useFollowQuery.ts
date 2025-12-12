import { FollowService } from "@/services/follow.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const FOLLOW_QUERY_KEY = ["follows"];

export const useFollow = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: FollowService.follow,
        onSuccess: () => {
            qc.invalidateQueries();
        },
    });
};

export const useUnfollow = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: FollowService.unfollow,
        onSuccess: () => {
            qc.invalidateQueries();
        },
    });
};