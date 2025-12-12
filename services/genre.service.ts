import http from "@/libs/http";
import { ApiResponse } from "@/types/body.type";
import { Genre } from "@/types/object.type";

const prefix = "genres";

export const GenreService = {
    getList(params?: any) {
        return http.get<ApiResponse<Genre[]>>(
            `/${prefix}`,
            { params }
        );
    },

    create(payload: Partial<Genre>) {
        return http.post<ApiResponse<Genre>>(
            `/${prefix}`,
            payload
        );
    },

    update(id: string, payload: Partial<Genre>) {
        return http.put<ApiResponse<Genre>>(
            `/${prefix}/${id}`,
            payload
        );
    },

    delete(id: string) {
        return http.delete<ApiResponse<null>>(
            `/${prefix}/${id}`
        );
    },
};