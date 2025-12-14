import { PlanService } from "@/services/plan.service";
import { Plan } from "@/types/object.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const PLAN_QUERY_KEY = ["plans"];


export const usePlans = () => {
    return useQuery({
        queryKey: PLAN_QUERY_KEY,
        queryFn: PlanService.getAll,
    });
};

export const useCreatePlan = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (payload: Plan) => PlanService.create(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: PLAN_QUERY_KEY });
        },
    });
};
