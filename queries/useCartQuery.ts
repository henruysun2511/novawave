import { CartService } from "@/services/cart.service";
import { AddCartDto } from "@/types/body.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const CART_DETAIL_QUERY_KEY = ["cart", "detail"]; 


export const useAddToCart = () => {
    const qc = useQueryClient();
    return useMutation<any, Error, AddCartDto>({
        mutationFn: (payload: AddCartDto) => CartService.add(payload),
        
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: CART_DETAIL_QUERY_KEY });
        },
    });
};

export const useRemoveFromCart = () => {
    const qc = useQueryClient();

    return useMutation<any, Error, string>({
        mutationFn: (productId: string) => CartService.remove(productId),
        
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: CART_DETAIL_QUERY_KEY });
        },
    });
};

export const useUserCart = () => {
    return useQuery({
        queryKey: CART_DETAIL_QUERY_KEY,
        queryFn: () => CartService.getDetail(),
        refetchOnWindowFocus: true, 
    });
};