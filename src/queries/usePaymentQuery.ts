import { PaymentService } from "@/services/payment.service";
import { useMutation, useQuery } from "@tanstack/react-query";

export const PAYMENT_QUERY_KEY = ["payments"];

export const usePaymentPlan = () =>
    useMutation({
        mutationFn: PaymentService.payPlan,
    });

export const usePaymentProduct = () =>
    useMutation({
        mutationFn: PaymentService.payProduct,
    });

export const usePaymentCancel = () =>
    useQuery({
        queryKey: [PAYMENT_QUERY_KEY, "cancel"],
        queryFn: () => PaymentService.cancel(),
        enabled: false,
    });
