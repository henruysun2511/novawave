import { ProductService } from "@/services/product.service";
import { ApiResponse, CreateProductDto } from "@/types/body.type";
import { Product } from "@/types/object.type";
import { ProductParam } from "@/types/param.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const PRODUCT_QUERY_KEY = ["products"];

export const useProductList = (params: ProductParam, options?: any) =>
  useQuery<ApiResponse<Product[]>>({
    queryKey: [...PRODUCT_QUERY_KEY, "admin", params],
    queryFn: async () => (await ProductService.getList(params)).data,
    ...options,
  });

export const useCommerceProductList = (options?: any) =>
  useQuery<ApiResponse<Product[]>>({
    queryKey: [...PRODUCT_QUERY_KEY, "commerce"],
    queryFn: async () => (await ProductService.getCommerceList()).data,
    ...options,
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
        mutationFn: ({ id, data }: {id: string, data: CreateProductDto}) => ProductService.update(id, data),
        onSuccess: () => qc.invalidateQueries({ queryKey: PRODUCT_QUERY_KEY }),
    });
};

export const useDeleteProduct = () => {
    const qc = useQueryClient();
    
    return useMutation({
        mutationFn: (id: string) => ProductService.delete(id),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: PRODUCT_QUERY_KEY });
        },
        onError: (error) => {
            console.error("Xóa thất bại:", error);
        }
    });
};

export const useAdminDeleteProduct = () => {
    const qc = useQueryClient();
    
    return useMutation({
        mutationFn: (id: string) => ProductService.adminDelete(id),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: PRODUCT_QUERY_KEY });
        },
        onError: (error) => {
            console.error("Xóa thất bại:", error);
        }
    });
};