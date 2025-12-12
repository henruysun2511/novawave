import http from "@/libs/http";
import { ApiResponse } from "@/types/body.type";

const prefix = "notifications";

export const NotificationService = {
    getList() {
        return http.get<ApiResponse<Notification[]>>(`/${prefix}`);
    },
   markRead(id: string) {
        return http.post<ApiResponse<null>>(
            `/${prefix}/mark-read/${id}`
        );
    },
};