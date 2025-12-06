import http from "@/libs/http";
import { LoginDto, LoginResType } from "@/types/body.type";



export const authService = {
    login: (body: LoginDto) =>
    http.post<LoginResType>("/auth/login", body).then((res) => res.data),
}