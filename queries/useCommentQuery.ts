import { CommentService } from "@/services/comment.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const COMMENT_QUERY_KEY = ["comments"];

export const useCommentList = () =>
    useQuery({
        queryKey: COMMENT_QUERY_KEY,
        queryFn: async () => (await CommentService.getList()).data,
    });

const commentMutation = (fn: any) => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: fn,
        onSuccess: () => qc.invalidateQueries({ queryKey: COMMENT_QUERY_KEY }),
    });
};

export const useCreateComment = () =>
    commentMutation(CommentService.create);
export const useUpdateComment = () =>
    commentMutation(({ id, data }: any) =>
        CommentService.update(id, data)
    );
export const useDeleteComment = () =>
    commentMutation(CommentService.delete);