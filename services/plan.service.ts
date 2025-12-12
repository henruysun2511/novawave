import http from "@/libs/http";
import { ApiResponse } from "@/types/body.type";

export const PlanService = {
    create(payload: any) {
        return http.post<ApiResponse<any>>(`/plans`, payload);
    },
};