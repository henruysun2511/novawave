import http from "@/libs/http";
import { ApiResponse } from "@/types/body.type";
import { Comment } from "@/types/object.type";
import { PaginationParam } from "@/types/param.type";

const prefix = "comments";

export const CommentService = {
    getList(songId: string, params?: PaginationParam) {
        return http.get<ApiResponse<Comment[]>>(`/${prefix}/${songId}`, {
            params,
        });
    },
    create(payload: Partial<Comment>) {
        return http.post<ApiResponse<Comment>>(`/${prefix}`, payload);
    },
    update(id: string, payload: Partial<Comment>) {
        return http.patch<ApiResponse<Comment>>(`/${prefix}/${id}`, payload);
    },
    delete(id: string) {
        return http.delete<ApiResponse<null>>(`/${prefix}/${id}`);
    },
};