import { DashboardService } from "@/services/dashboard.service";
import { UserDashboardParam } from "@/types/param.type";
import { useQuery } from "@tanstack/react-query";

export const USER_DASHBOARD_QUERY_KEY = ["userDashboard"];

export const useUserDashboard = (params: UserDashboardParam) =>
    useQuery({
        queryKey: [...USER_DASHBOARD_QUERY_KEY, params], 
        queryFn: async () => {
            const response = await DashboardService.getUserDashboardData(params);
            return response.data; 
        },
    });