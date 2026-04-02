import http from "@/libs/http";
import { ApiResponse } from "@/types/body.type";
import { PurchaseHistory } from "@/types/object.type";

export const purchaseHistoryService = {
    getList() {
        return http.get<ApiResponse<PurchaseHistory[]>>(`/purchase-history`);
    },
};