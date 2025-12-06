import { authService } from "@/services/auth.service";
import { useAuthStore } from "@/stores/useAuthStore";
import { useMutation } from "@tanstack/react-query";

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      useAuthStore.getState().setAuth(data.accessToken, data.user);
    },
  });
};