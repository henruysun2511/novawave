import http from "@/libs/http";
import { ApiResponse } from "@/types/body.type";
import { PaginationParam } from "@/types/param.type";

const prefix = "likes";

export const LikeService = {
    like(songId: string) {
        return http.post<ApiResponse<any>>(`/${prefix}/like`, {
            songId,
        });
    },

    unlike(songId: string) {
        return http.post<ApiResponse<any>>(`/${prefix}/unlike`, {
            songId,
        });
    },

    getUserLike(params: PaginationParam) {
        return http.get<ApiResponse<any[]>>(`/${prefix}`, { params });
    },
};