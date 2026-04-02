import { DashboardService } from "@/services/dashboard.service";
import { DashboardParam } from "@/types/param.type";
import { useQuery } from "@tanstack/react-query";

export const USER_DASHBOARD_QUERY_KEY = ["userDashboard"];
export const ARTIST_DASHBOARD_QUERY_KEY = ["artistDashboard"];
export const REVENUE_DASHBOARD_QUERY_KEY = ["revenueDashboard"];

export const useUserDashboard = (params: DashboardParam) =>
    useQuery({
        queryKey: [...USER_DASHBOARD_QUERY_KEY, params],
        queryFn: async () => {
            const response = await DashboardService.getUserDashboard(params);
            return response.data;
        },
    });

export const useArtistDashboard = (params: DashboardParam) =>
    useQuery({
        queryKey: [...ARTIST_DASHBOARD_QUERY_KEY , params],
        queryFn: async () => {
            const response = await DashboardService.getArtistDashboard(params);
            return response.data;
        },
    });

export const useRevenueDashboard = (params: DashboardParam) =>
    useQuery({
        queryKey: [...REVENUE_DASHBOARD_QUERY_KEY, params],
        queryFn: async () => {
            const response = await DashboardService.getRevenueDashboard(params);
            return response.data;
        },
    });