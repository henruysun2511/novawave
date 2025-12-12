import http from "@/libs/http";
import { ApiResponse } from "@/types/body.type";

export const LikeService = {
    like() {
        return http.post<ApiResponse<null>>(`/like`);
    },
    unlike() {
        return http.post<ApiResponse<null>>(`/unlike`);
    },
};