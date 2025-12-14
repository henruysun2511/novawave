import http from "@/libs/http";
import { ApiResponse } from "@/types/body.type";
import { PaginationParam } from "@/types/param.type";

const prefix = 'follows';

export const FollowService = {
    follow(artistId: string) {
        return http.post<ApiResponse<null>>(`/${prefix}/follow`, {
            artistId
        });
    },
    unfollow(artistId: string) {
        return http.post<ApiResponse<null>>(`/${prefix}/unfollow`, {
            artistId
        });
    },
    getUserFollow(params: PaginationParam) {
        return http.get<ApiResponse<any[]>>(`/${prefix}`, { params });
    },
};