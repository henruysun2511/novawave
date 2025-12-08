import http from "@/libs/http";
import { LoginDto, LoginRes } from "@/types/body.type";
import { ApiResponse } from './../../lexo-fe/src/types/api-response';



export const authService = {
    login: (body: LoginDto) =>
    http.post<ApiResponse<LoginRes>>("/auth/login", body).then((res) => res.data.data),
}