import { NotificationService } from "@/services/nofitication.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const NOTIFICATION_QUERY_KEY = ["notifications"];

export const useNotificationList = () =>
    useQuery({
        queryKey: NOTIFICATION_QUERY_KEY,
        queryFn: async () => (await NotificationService.getList()).data,
    });

export const useMarkNotificationRead = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: NotificationService.markRead,
        onSuccess: () =>
            qc.invalidateQueries({ queryKey: NOTIFICATION_QUERY_KEY }),
    });
};