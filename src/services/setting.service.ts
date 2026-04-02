import http from "@/libs/http";
import { ApiResponse } from "@/types/body.type";
import { Setting } from "@/types/object.type";

const prefix = "settings";

export const SettingService = {
    getSettings() {
        return http.get<ApiResponse<Setting>>(
            `/${prefix}`
        );
    },

    update(payload: Partial<Setting>) {
        return http.put<ApiResponse<Setting>>(
            `/${prefix}`,
            payload
        );
    }
};