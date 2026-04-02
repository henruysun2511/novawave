import http from "@/libs/http";
import { ApiResponse } from "@/types/body.type";
import { Permission } from "@/types/object.type";
import { PermissionParam } from "@/types/param.type";

const prefix = "permissions";

export const PermissionService = {
    getList(params: PermissionParam) {
        return http.get<ApiResponse<Permission[]>>(`/${prefix}`, {
            params
        });
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