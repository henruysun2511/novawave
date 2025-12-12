import http from "@/libs/http";
import { ApiResponse } from "@/types/body.type";
import { ProductParam } from "@/types/param.type";
import { Product } from './../types/object.type';

const prefix = "products";

export const ProductService = {
    getList(params: ProductParam) {
        return http.get<ApiResponse<Product[]>>(`/${prefix}`, { params });
    },

    create(payload: FormData) {
        return http.post<ApiResponse<Product>>(
            "/products",
            payload,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            }
        );
    },

    update(id: string, payload: FormData) {
        return http.patch<ApiResponse<Product>>(`/${prefix}/${id}`, payload,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            }
        );
    },
};



