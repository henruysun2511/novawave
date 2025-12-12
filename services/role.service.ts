import http from "@/libs/http";
import { ApiResponse } from "@/types/body.type";

const prefix = "roles";

export const RoleService = {
    getList() {
        return http.get<ApiResponse<Role[]>>(`/${prefix}`);
    },
    getDetail(id: string) {
        return http.get<ApiResponse<Role>>(`/${prefix}/${id}`);
    },
    create(payload: Partial<Role>) {
        return http.post<ApiResponse<Role>>(`/${prefix}`, payload);
    },
    update(id: string, payload: Partial<Role>) {
        return http.patch<ApiResponse<Role>>(`/${prefix}/${id}`, payload);
    },
    delete(id: string) {
        return http.delete<ApiResponse<null>>(`/${prefix}/${id}`);
    },
};