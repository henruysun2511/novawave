import { NotificationService } from "@/services/nofitication.service";
import { PaginationParam } from "@/types/param.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const NOTIFICATION_QUERY_KEY = ["notifications"];

export const useNotificationList = (params: PaginationParam) =>
    useQuery({
        queryKey: NOTIFICATION_QUERY_KEY,
        queryFn: async () => (await NotificationService.getList(params)).data,
    });

export const useMarkRead = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => NotificationService.markRead(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: NOTIFICATION_QUERY_KEY });
        },
    });
};