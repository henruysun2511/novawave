import http from "@/libs/http";
import { PaymentPlanDto } from "@/types/body.type";

export const PaymentService = {
    payPlan(payload: PaymentPlanDto) {
        return http.post(`/payments/plan`, payload);
    },
    payProduct(payload: any) {
        return http.post(`/payments/product`, payload);
    },
    cancel() {
        return http.get(`/payments/cancel`);
    },
};