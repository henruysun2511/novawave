import http from "@/libs/http";
import { ApiResponse } from "@/types/body.type";

export const CartService = {
    add(payload: any) {
        return http.patch<ApiResponse<Cart>>(`/carts`, payload);
    },
    remove(productId: string) {
        return http.patch<ApiResponse<Cart>>(`/carts/remove-product`, {
            productId,
        });
    },
};
