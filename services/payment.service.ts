import http from "@/libs/http";

export const PaymentService = {
    payPlan(payload: any) {
        return http.post(`/payments/plan`, payload);
    },
    payProduct(payload: any) {
        return http.post(`/payments/product`, payload);
    },
    cancel() {
        return http.get(`/payments/cancel`);
    },
    webhook(payload: any) {
        return http.post(`/payments/webhook`, payload);
    },
};