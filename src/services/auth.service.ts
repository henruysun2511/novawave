import http from "@/libs/http";
import { ApiResponse, ChangePasswordDto, LoginDto, LoginRes, RegisterDto, ResetPasswordDto, SendEmailDto, UpdateUserInfoDto, VerifyOtpDto } from "@/types/body.type";
import { User } from "@/types/object.type";


export const AuthService = {
    login: (body: LoginDto) =>
        http.post<ApiResponse<LoginRes>>("/auth/login", body).then((res) => res.data.data),

    googleLogin: () =>
        http.post<ApiResponse<LoginRes>>("/auth/login").then((res) => res.data),

    register: (body: RegisterDto) =>
        http.post<ApiResponse<null>>("/auth/register", body).then((res) => res.data),

    logout: () =>
        http.post<ApiResponse<null>>("/auth/logout").then((res) => res.data),

    sendEmail: (body: SendEmailDto) =>
        http.post<ApiResponse<null>>("/auth/forgot-password", body).then((res) => res.data),

    verifyOtp: (body: VerifyOtpDto) =>
        http.post<ApiResponse<null>>("/auth/verify-otp", body).then((res) => res.data),

    resetPassword: (body: ResetPasswordDto) =>
        http.patch<ApiResponse<null>>("/auth/reset-password", body).then((res) => res.data),

    changePassword: (body: ChangePasswordDto) =>
        http.patch<ApiResponse<null>>("/auth/change-password", body).then((res) => res.data),

    getUserInfo: () =>
        http.get<ApiResponse<User>>("/auth/profile").then((res) => res.data),

    updateUserInfo: (body: UpdateUserInfoDto) =>
        http.put<ApiResponse<null>>("/auth/info", body).then((res) => res.data),
}