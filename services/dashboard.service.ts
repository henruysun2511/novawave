import http from "@/libs/http";
import { ApiResponse } from "@/types/body.type";
import { UserDashboard } from "@/types/object.type";
import { DashboardParam } from "@/types/param.type";

const prefix = 'dashboard'

export const DashboardService = {
    getUserDashboard(params: DashboardParam) {
        return http.get<ApiResponse<UserDashboard[]>>(`/${prefix}/users`, {
            params,
        });
    },
    getArtistDashboard(params: DashboardParam) {
        return http.get<ApiResponse<UserDashboard[]>>(`/${prefix}/artists`, {
            params,
        });
    },
    getRevenueDashboard(params: DashboardParam) {
        return http.get<ApiResponse<UserDashboard[]>>(`/${prefix}/revenue`, {
            params,
        });
    },
};