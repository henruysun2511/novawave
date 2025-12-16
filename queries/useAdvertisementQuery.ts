import { AdvertisementService } from "@/services/advertisement.service";
import { ApiResponse } from "@/types/body.type";
import { Advertisement } from "@/types/object.type";
import { AdvertisementParam } from "@/types/param.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";


export const ADVERTISEMENT_QUERY_KEY = ["advertisements"];

export const useAdvertisementList = (params: AdvertisementParam) => {
    return useQuery<ApiResponse<Advertisement[]>>({
        queryKey: [...ADVERTISEMENT_QUERY_KEY, params],
        queryFn: async () => {
            const res = await AdvertisementService.getList(params);
            return res.data;
        },
    });
};

export const useAdvertisementDetail = (id: string) => {
    return useQuery<ApiResponse<Advertisement>>({
        queryKey: [...ADVERTISEMENT_QUERY_KEY, id], 
        queryFn: async () => {
            const res = await AdvertisementService.getDetail(id);
            return res.data;
        },
        enabled: !!id, 
        staleTime: 5 * 60 * 1000, 
    });
};

export const useCreateAdvertisement = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: AdvertisementService.create,
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ADVERTISEMENT_QUERY_KEY });
        },
    });
};

export const useUpdateAdvertisement = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: FormData }) =>
            AdvertisementService.update(id, data),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ADVERTISEMENT_QUERY_KEY });
        },
    });
};

export const useDeleteAdvertisement = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: AdvertisementService.delete,
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ADVERTISEMENT_QUERY_KEY });
        },
    });
};

export const useToggleAdvertisement = () => {
    const qc = useQueryClient();

    return useMutation({
        mutationFn: ({
            id,
            isActived,
        }: {
            id: string;
            isActived: boolean;
        }) => {
            return isActived
                ? AdvertisementService.activate(id)
                : AdvertisementService.deactivate(id);
        },
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ADVERTISEMENT_QUERY_KEY });
        },
    });
};