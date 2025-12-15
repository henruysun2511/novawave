import http from "@/libs/http";
import { ApiResponse, PaymentPlanDto } from "@/types/body.type";
import { Payment } from "@/types/object.type";

export const PaymentService = {
    payPlan(payload: PaymentPlanDto): Promise<ApiResponse<Payment>> {
        return http.post<ApiResponse<Payment>>(`/payments/plan`, payload)
            .then(res => res.data);
    },
    payProduct(payload: any) {
        return http.post(`/payments/product`, payload);
    },
    cancel() {
        return http.get(`/payments/cancel`);
    },
};