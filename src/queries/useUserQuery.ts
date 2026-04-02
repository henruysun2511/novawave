import { UserService } from "@/services/user.service";
import { UserParam } from "@/types/param.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";


export const USER_QUERY_KEY = ["users"];

// GET LIST
export const useUserList = (params: UserParam) => {
  return useQuery({
    queryKey: [...USER_QUERY_KEY, params],
    queryFn: async () => {
      const res = await UserService.getList(params);
      return res.data;
    },
  });
};

// TOGGLE STATUS
export const useToggleStatus = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: UserService.toggleStatus,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: USER_QUERY_KEY });
    },
  });
};

export const useDeleteUser = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: UserService.delete,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: USER_QUERY_KEY });
    },
  });
};

export const useUpdateUserRole = () => {
    const qc = useQueryClient();

    return useMutation({
        mutationFn: ({ id, roleId }: { id: string, roleId: string }) =>
            UserService.updateRole(id, roleId),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: USER_QUERY_KEY });
        },
    });
};