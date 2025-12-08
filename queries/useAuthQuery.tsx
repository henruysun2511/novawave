import { authService } from "@/services/auth.service";
import { useAuthStore } from "@/stores/useAuthStore";
import { JwtPayload } from "@/types/body.type";
import { useMutation } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";


export const useLoginMutation = () => {
  return useMutation({
    mutationFn: authService.login,

    onSuccess: (data) => {
      sessionStorage.setItem("accessToken", data.accessToken);
      const payload = jwtDecode<JwtPayload>(data.accessToken);

      useAuthStore
        .getState()
        .setAuth(data.accessToken, payload);
    },
  });
};