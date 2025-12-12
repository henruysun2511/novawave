import http from "@/libs/http";
import { ApiResponse } from "@/types/body.type";

const prefix = "permissions";

export const PermissionService = {
    getList() {
        return http.get<ApiResponse<Permission[]>>(`/${prefix}`);
    },
    create(payload: Partial<Permission>) {
        return http.post<ApiResponse<Permission>>(`/${prefix}`, payload);
    },
    update(id: string, payload: Partial<Permission>) {
        return http.patch<ApiResponse<Permission>>(`/${prefix}/${id}`, payload);
    },
    delete(id: string) {
        return http.delete<ApiResponse<null>>(`/${prefix}/${id}`);
    },
};