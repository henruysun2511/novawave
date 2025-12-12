import { PermissionService } from "@/services/permission.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const PERMISSION_QUERY_KEY = ["permissions"];

export const usePermissionList = () =>
    useQuery({
        queryKey: PERMISSION_QUERY_KEY,
        queryFn: async () => (await PermissionService.getList()).data,
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