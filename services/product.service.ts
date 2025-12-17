import http from "@/libs/http";
import { ApiResponse, CreateProductDto } from "@/types/body.type";
import { ProductParam } from "@/types/param.type";
import { Product } from './../types/object.type';

const prefix = "products";

export const ProductService = {
    getList(params: ProductParam) {
        return http.get<ApiResponse<Product[]>>(`/${prefix}`, { params });
    },

    create(payload: CreateProductDto) {
        return http.post<ApiResponse<Product>>(
            "/products",
            payload
        );
    },

    update(id: string, payload: CreateProductDto) {
        return http.patch<ApiResponse<Product>>(`/${prefix}/${id}`, payload
        );
    },
    delete(id: string) {
        return http.delete<ApiResponse<any>>(`/${prefix}/${id}`);
    },
};



