import http from "@/libs/http";
import { ApiResponse } from "@/types/body.type";
import { News } from "@/types/object.type"; // Giả định bạn đã định nghĩa type News
import { NewsParam } from "@/types/param.type";

const prefix = "news"
export const NewsService = {
    getList(params: NewsParam   ) {
        return http.get<ApiResponse<News[]>>(`/${prefix}`, { params });
    },
    getDetail(id: string) {
        return http.get<ApiResponse<News>>(`/${prefix}/detail/${id}`);
    },
    create(payload: any) {
        return http.post<ApiResponse<News>>(`/${prefix}`, payload);
    },
    update(id: string, payload: any) {
        return http.put<ApiResponse<News>>(`/${prefix}/${id}`, payload);
    },
    updateStatus(id: string, status: string) {
        return http.patch<ApiResponse<News>>(`/${prefix}/${id}/status`, { status });
    },
    delete(id: string) {
        return http.delete<ApiResponse<null>>(`/${prefix}/${id}`);
    }
};