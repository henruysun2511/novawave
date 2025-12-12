import http from "@/libs/http";
import { ApiResponse } from "@/types/body.type";
import { User } from "@/types/object.type";
import { UserParam } from "@/types/param.type";


export const UserService = {
    getList(params: UserParam) {
        return http.get<ApiResponse<User[]>>(
            "/users",
            { params }
        );
    },

    toggleStatus(id: string) {
        return http.patch<ApiResponse<User>>(`/users/status/${id}`);
    },

    delete(id: string) {
        return http.delete<ApiResponse<null>>(`/users/${id}`);
    }
}