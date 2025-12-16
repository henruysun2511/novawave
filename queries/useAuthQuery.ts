import { AuthService } from "@/services/auth.service";
import { useAuthStore } from "@/stores/useAuthStore";
import { useSidebarStore } from "@/stores/useSidebarStore";
import { ChangePasswordDto, ResetPasswordDto, UpdateUserInfoDto, UserJwtPayload } from "@/types/body.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";


export const useLoginMutation = () => {
  return useMutation({
    mutationFn: AuthService.login,

    onSuccess: async (data) => {
      sessionStorage.setItem("accessToken", data.accessToken);

      const payload = jwtDecode<UserJwtPayload>(data.accessToken);
      console.log(payload)
      
      useAuthStore.getState().setAuth(data.accessToken, payload);
      useAuthStore.getState().setRoleName(data.roleName);
      localStorage.setItem("roleName", data.roleName);

      //Mở sidebar
      useSidebarStore.getState().showInfo();
    },
  });
};

export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: AuthService.register,
  });
};

export const useLogoutMutation = () => {
  return useMutation({
    mutationFn: AuthService.logout,

    onSuccess: () => {
      sessionStorage.removeItem("accessToken");
      useAuthStore.getState().logout();
      useSidebarStore.getState().resetLayout();
    },

    onError: () => {
      sessionStorage.removeItem("accessToken");
      localStorage.removeItem("roleName");
      useAuthStore.getState().logout();
      useSidebarStore.getState().resetLayout();
    }
  });
};

export const useSendEmailMutation = () => {
  return useMutation({
    mutationFn: AuthService.sendEmail,

    onSuccess: (_data, variables) => {
      useAuthStore.getState().setEmail(variables.email);
    },
  });
};

export const useVerifyOtpMutaion = () => {
  return useMutation({
    mutationFn: AuthService.verifyOtp,
  });
};

export const useResetPasswordMutation = () => {
  return useMutation({
    mutationFn: (data: ResetPasswordDto) => AuthService.resetPassword(data),
  });
};

export const useChangePasswordMutation = () => {
  return useMutation({
    mutationFn: (data: ChangePasswordDto) => AuthService.changePassword(data),
  });
};

export const useGetUserInfoQuery = () => {
  return useQuery({
    queryKey: ["user-info"],
    queryFn: () => AuthService.getUserInfo(),
  });
};

export const useUpdateUserInfoMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: UpdateUserInfoDto) => AuthService.updateUserInfo(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-info"] });
    }
  });
};