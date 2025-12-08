import http from "@/libs/http";
import { ApiResponse, LoginDto, LoginRes } from "@/types/body.type";



export const authService = {
    login: (body: LoginDto) =>
    http.post<ApiResponse<LoginRes>>("/auth/login", body).then((res) => res.data.data),
}