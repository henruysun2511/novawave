import { FollowService } from "@/services/follow.service";
import { PaginationParam } from "@/types/param.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const FOLLOW_QUERY_KEY = ["follows"];

export const useFollow = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (artistID: string) => FollowService.follow(artistID),
        onSuccess: () => {
            qc.invalidateQueries();
        },
    });
};

export const useUnfollow = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (artistID: string) => FollowService.unfollow(artistID),
        onSuccess: () => {
            qc.invalidateQueries();
        },
    });
};

export const useUserFollow = (params: PaginationParam) =>
    useQuery({
        queryKey: [...FOLLOW_QUERY_KEY, params],
        queryFn: async () =>
            (await FollowService.getUserFollow(params)).data,
    });