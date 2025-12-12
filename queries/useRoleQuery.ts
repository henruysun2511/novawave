import { RoleService } from "@/services/role.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const ROLE_QUERY_KEY = ["roles"];

export const useRoleList = () =>
    useQuery({
        queryKey: ROLE_QUERY_KEY,
        queryFn: async () => (await RoleService.getList()).data,
    });

export const useRoleDetail = (id: string) =>
    useQuery({
        queryKey: [...ROLE_QUERY_KEY, id],
        queryFn: async () => (await RoleService.getDetail(id)).data,
        enabled: !!id,
    });

const roleMutation = (fn: any) => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: fn,
        onSuccess: () => qc.invalidateQueries({ queryKey: ROLE_QUERY_KEY }),
    });
};

export const useCreateRole = () => roleMutation(RoleService.create);
export const useUpdateRole = () =>
    roleMutation(({ id, data }: any) => RoleService.update(id, data));
export const useDeleteRole = () => roleMutation(RoleService.delete);