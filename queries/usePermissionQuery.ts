import { PermissionService } from "@/services/permission.service";
import { PermissionParam } from "@/types/param.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const PERMISSION_QUERY_KEY = ["permissions"];

export const usePermissionList = (params: PermissionParam) =>
    useQuery({
        queryKey: [...PERMISSION_QUERY_KEY, params],
        queryFn: async () => (await PermissionService.getList(params)).data,
    });

const permissionMutation = (fn: any) => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: fn,
        onSuccess: () =>
            qc.invalidateQueries({ queryKey: PERMISSION_QUERY_KEY }),
    });
};

export const useCreatePermission = () =>
    permissionMutation(PermissionService.create);
export const useUpdatePermission = () =>
    permissionMutation(({ id, data }: any) =>
        PermissionService.update(id, data)
    );
export const useDeletePermission = () =>
    permissionMutation(PermissionService.delete);