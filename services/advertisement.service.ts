import http from "@/libs/http";
import { AdvertisementDto, ApiResponse } from "@/types/body.type";
import { Advertisement } from "@/types/object.type";
import { AdvertisementParam } from "@/types/param.type";

const prefix = "advertisements"
export const AdvertisementService = {
    getList(params: AdvertisementParam) {
        return http.get<ApiResponse<Advertisement[]>>(
            `/${prefix}`,
            { params }
        );
    },

    getDetail(id: string) {
        return http.get<ApiResponse<Advertisement>>(
            `/${prefix}/detail/${id}`
        );
    },

    create(payload: AdvertisementDto) {
        return http.post<ApiResponse<Advertisement>>(
            `/${prefix}`,
            payload
        );
    },

    update(id: string, payload: AdvertisementDto) {
        return http.put<ApiResponse<Advertisement>>(
            `/${prefix}/${id}`,
            payload
        );
    },

    delete(id: string) {
        return http.delete<ApiResponse<null>>(
            `/${prefix}/${id}`
        );
    },

    activate(id: string) {
        return http.patch<ApiResponse<Advertisement>>(
            `/${prefix}/${id}/activate`
        );
    },

    deactivate(id: string) {
        return http.patch<ApiResponse<Advertisement>>(
            `/${prefix}/${id}/deactivate`
        );
    },
};