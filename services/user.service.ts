import http from "@/libs/http";
import { ApiResponse } from "@/types/body.type";
import { User } from "@/types/object.type";
import { UserParam } from "@/types/param.type";

const prefix = 'users';
export const UserService = {
    getList(params: UserParam) {
        return http.get<ApiResponse<User[]>>(
            "/users",
            { params }
        );
    },

    toggleStatus(id: string) {
        return http.patch<ApiResponse<User>>(`/${prefix}/status/${id}`);
    },

    delete(id: string) {
        return http.delete<ApiResponse<null>>(`/${prefix}/${id}`);
    },

    updateRole(id: string, roleId: string) {
        return http.patch<ApiResponse<User>>(`/${prefix}/${id}`, {
            roleId 
        });
    }
}