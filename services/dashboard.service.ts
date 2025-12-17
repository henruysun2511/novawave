import http from "@/libs/http";
import { ApiResponse } from "@/types/body.type";
import { UserDashboard } from "@/types/object.type";
import { UserDashboardParam } from "@/types/param.type";

const prefix = 'dashboard'

export const DashboardService = {
    getUserDashboardData(params: UserDashboardParam) {
        return http.get<ApiResponse<UserDashboard[]>>(`/${prefix}`, {
            params,
        });
    },
};