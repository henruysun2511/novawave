import http from "@/libs/http";
import { ApiResponse } from "@/types/body.type";

export const FollowService = {
    follow() {
        return http.post<ApiResponse<null>>(`/follow`);
    },
    unfollow() {
        return http.post<ApiResponse<null>>(`/unfollow`);
    },
};