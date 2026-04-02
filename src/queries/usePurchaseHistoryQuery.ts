import { purchaseHistoryService } from "@/services/purchaseHistory.service";
import { useQuery } from "@tanstack/react-query";

export const PRODUCT_QUERY_KEY = ["purchase-history"];

export function usePurchaseHistory() {
    return useQuery({
        queryKey: PRODUCT_QUERY_KEY, 
        queryFn: () => purchaseHistoryService.getList(),
    });
}