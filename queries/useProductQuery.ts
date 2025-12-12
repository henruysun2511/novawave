import { ProductService } from "@/services/product.service";
import { ProductParam } from "@/types/param.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const PRODUCT_QUERY_KEY = ["products"];

export const useProductList = (params : ProductParam) =>
    useQuery({
        queryKey: [...PRODUCT_QUERY_KEY, params],
        queryFn: async () => (await ProductService.getList(params)).data,
    });

export const useCreateProduct = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: ProductService.create,
        onSuccess: () =>
            qc.invalidateQueries({ queryKey: PRODUCT_QUERY_KEY }),
    });
};

export const useUpdateProduct = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: any) => ProductService.update(id, data),
        onSuccess: () => qc.invalidateQueries({ queryKey: PRODUCT_QUERY_KEY }),
    });
};