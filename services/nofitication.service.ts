import http from "@/libs/http";
import { ApiResponse } from "@/types/body.type";
import { Notification } from "@/types/object.type";
import { PaginationParam } from "@/types/param.type";

const prefix = "notifications";

export const NotificationService = {
    getList(params: PaginationParam) {
        return http.get<ApiResponse<Notification[]>>(`/${prefix}`, { params });
    },
    markRead(id: string) {
        return http.post<ApiResponse<null>>(
            `/${prefix}/mark-read/${id}`
        );
    },
};