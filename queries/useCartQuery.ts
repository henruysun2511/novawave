import { CartService } from "@/services/cart.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const CART_QUERY_KEY = ["cart"];

export const useAddToCart = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: CartService.add,
        onSuccess: () => qc.invalidateQueries({ queryKey: CART_QUERY_KEY }),
    });
};

export const useRemoveFromCart = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: CartService.remove,
        onSuccess: () => qc.invalidateQueries({ queryKey: CART_QUERY_KEY }),
    });
};