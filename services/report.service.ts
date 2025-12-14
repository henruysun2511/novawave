import http from "@/libs/http";
import { ApiResponse, ReportDto } from "@/types/body.type";
import { Report } from "@/types/object.type";
import { ReportParam } from "@/types/param.type";

const prefix = 'reports';
export const ReportService = {
    getList(params: ReportParam) {
        return http.get<ApiResponse<Report[]>>(`/${prefix}`, { params });
    },

    create(payload: Report) {
        return http.post<ApiResponse<Report>>(`/${prefix}`, payload);
    },

    update(id: string, payload: ReportDto) {
        return http.patch<ApiResponse<Report>>(`/${prefix}/${id}`, payload);
    },
};