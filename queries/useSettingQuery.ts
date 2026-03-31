import { SettingService } from "@/services/setting.service";
import { ApiResponse } from "@/types/body.type";
import { Setting } from "@/types/object.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const SETTING_QUERY_KEY = ["settings"];

export const useSettings = () => {
    return useQuery<ApiResponse<Setting>>({
        queryKey: SETTING_QUERY_KEY,
        queryFn: async () => {
            const res = await SettingService.getSettings();
            return res.data;
        },
        staleTime: 10 * 60 * 1000, // Cấu hình hệ thống ít thay đổi, có thể để lâu hơn
    });
};

export const useUpdateSettings = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (data: Partial<Setting>) => SettingService.update(data),
        onSuccess: () => {
            // Làm mới dữ liệu setting trên toàn bộ app sau khi update thành công
            qc.invalidateQueries({ queryKey: SETTING_QUERY_KEY });
        },
    });
};