import { CommentService } from "@/services/comment.service";
import { Comment } from "@/types/object.type";
import { PaginationParam } from "@/types/param.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const COMMENT_QUERY_KEY = ["comments"];

export const useCommentList = (
    songId: string,
    params: PaginationParam
) =>
    useQuery({
        queryKey: [...COMMENT_QUERY_KEY, songId, params],
        queryFn: async () =>
            (await CommentService.getList(songId, params)).data,
        enabled: !!songId,
    });


export const useCreateComment = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: CommentService.create,
        onSuccess: () => qc.invalidateQueries({ queryKey: COMMENT_QUERY_KEY }),
    });
};

export const useUpdateComment = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: string, data: Partial<Comment> }) =>
            CommentService.update(id, data),
        onSuccess: () => qc.invalidateQueries({ queryKey: COMMENT_QUERY_KEY }),
    });
};

export const useDeleteComment = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: CommentService.delete,
        onSuccess: () => qc.invalidateQueries({ queryKey: COMMENT_QUERY_KEY }),
    });
};