import { NewsService } from "@/services/news.service";
import { NewsParam } from "@/types/param.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const NEWS_QUERY_KEY = ["news"];

export const useNewsList = (params: NewsParam) => {
    return useQuery({
        queryKey: [...NEWS_QUERY_KEY, params],
        queryFn: async () => (await NewsService.getList(params)).data,
    });
};

export const useNewsDetail = (id: string) => {
    return useQuery({
        queryKey: [...NEWS_QUERY_KEY, id],
        queryFn: async () => (await NewsService.getDetail(id)).data,
        enabled: !!id,
    });
};

export const useCreateNews = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: NewsService.create,
        onSuccess: () => qc.invalidateQueries({ queryKey: NEWS_QUERY_KEY }),
    });
};

export const useUpdateNews = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: any }) => NewsService.update(id, data),
        onSuccess: () => qc.invalidateQueries({ queryKey: NEWS_QUERY_KEY }),
    });
};

export const useUpdateNewsStatus = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: ({ id, status }: { id: string; status: string }) => NewsService.updateStatus(id, status),
        onSuccess: () => qc.invalidateQueries({ queryKey: NEWS_QUERY_KEY }),
    });
};

export const useDeleteNews = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: NewsService.delete,
        onSuccess: () => qc.invalidateQueries({ queryKey: NEWS_QUERY_KEY }),
    });
};