import http from "@/libs/http";
import { ApiResponse } from "@/types/body.type";
import { Plan } from "@/types/object.type";

export const PlanService = {
    getAll: () => {
        return http.get<ApiResponse<Plan[]>>(`/plans`);
    },

    create: (payload: Plan) => {
        return http.post<ApiResponse<Plan>>(`/plans`, payload);
    },
};