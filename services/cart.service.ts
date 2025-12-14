import http from "@/libs/http";
import { AddCartDto, ApiResponse } from "@/types/body.type";
import { Cart } from "@/types/object.type";

export const CartService = {
    add(payload: AddCartDto) {
        return http.patch<ApiResponse<null>>(`/carts`, payload);
    },
    remove(productId: string) {
        return http.patch<ApiResponse<null>>(`/carts/remove-product`, {
            productId,
        });
    },
    getDetail() {
        return http.get<ApiResponse<Cart>>(`/carts/me`);
    },
};
