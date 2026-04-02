import { RoleService } from "@/services/role.service";
import { Role } from "@/types/object.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const ROLE_QUERY_KEY = ["roles"];

export const useRoleList = () =>
    useQuery({
        queryKey: ROLE_QUERY_KEY,
        queryFn: async () => (await RoleService.getList()).data,
    });

export const useCreateRole = () => {
    const qc = useQueryClient();
    
    return useMutation({
        mutationFn: RoleService.create,
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ROLE_QUERY_KEY });
        },
    });
};


export const useUpdateRole = () => {
    const qc = useQueryClient();

    return useMutation({
        mutationFn: ({ id, payload } : {id: string, payload: Role}) => RoleService.update(id, payload),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ROLE_QUERY_KEY });
        },
    });
};


export const useDeleteRole = () => {
    const qc = useQueryClient();

    return useMutation({
        mutationFn: RoleService.delete,
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ROLE_QUERY_KEY });
        },
    });
};

export const useAssignPermissions = () => {
    const qc = useQueryClient();

    type AssignPermissionVariables = { 
        roleId: string; 
        permissionIds: string[]; 
    };

    return useMutation({
        mutationFn: ({ roleId, permissionIds }: AssignPermissionVariables) => 
            RoleService.assignPermissions(roleId, { 
                permissions: permissionIds 
            }),
            
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ROLE_QUERY_KEY });
        },
    });
};