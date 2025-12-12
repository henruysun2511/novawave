import http from "@/libs/http";
import { ApiResponse } from "@/types/body.type";

const prefix = "comments";

export const CommentService = {
    getList() {
        return http.get<ApiResponse<Comment[]>>(`/${prefix}`);
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