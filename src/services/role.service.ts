import http from "@/libs/http";
import { ApiResponse, AssignPermissionDto } from "@/types/body.type";
import { Role } from "@/types/object.type";

const prefix = "roles";

export const RoleService = {
    getList() {
        return http.get<ApiResponse<Role[]>>(`/${prefix}`);
    },
    create(payload: Role) {
        return http.post<ApiResponse<Role>>(`/${prefix}`, payload);
    },
    update(id: string, payload: Role) {
        return http.put<ApiResponse<Role>>(`/${prefix}/${id}`, payload);
    },
    delete(id: string) {
        return http.delete<ApiResponse<null>>(`/${prefix}/${id}`);
    },
    assignPermissions(id: string, payload: AssignPermissionDto) {
        return http.patch<ApiResponse<Role>>(`/roles/${id}`, payload);
    },
};