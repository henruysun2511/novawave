import { PlanService } from "@/services/plan.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const PLAN_QUERY_KEY = ["plans"];

export const useCreatePlan = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: PlanService.create,
        onSuccess: () => qc.invalidateQueries({ queryKey: PLAN_QUERY_KEY }),
    });
};
