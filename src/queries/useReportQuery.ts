import { ReportService } from "@/services/report.service";
import { ReportDto } from "@/types/body.type";
import { ReportParam } from "@/types/param.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const REPORT_QUERY_KEY = ["reports"];

export const useReportList = (params: ReportParam) =>
    useQuery({
        // Thêm params vào queryKey để React Query cache riêng cho từng bộ tham số
        queryKey: [...REPORT_QUERY_KEY, params],
        queryFn: async () => (await ReportService.getList(params)).data,
    });

export const useCreateReport = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: ReportService.create,
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: REPORT_QUERY_KEY });
        },
    });
};

export const useUpdateReport = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: string, data: ReportDto}) => 
            ReportService.update(id, data),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: REPORT_QUERY_KEY });
        },
    });
};