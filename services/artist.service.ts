import http from "@/libs/http";
import { ApiResponse, UpdateVerificationDto } from "@/types/body.type";
import { Artist } from "@/types/object.type";
import { ArtistParam, PaginationParam } from "@/types/param.type";


const prefix = "artists";

export const ArtistService = {
    getList(params: ArtistParam) {
        return http.get<ApiResponse<Artist[]>>(`/${prefix}`, { params });
    },

    getListAdmin(params: ArtistParam) {
        return http.get<ApiResponse<Artist[]>>(`/admin/${prefix}`, { params });
    },


    getProfile() {
        return http.get<ApiResponse<Artist>>(`/${prefix}/profile`);
    },

    updateProfile(payload: FormData) {
        return http.put<ApiResponse<Artist>>(
            `/${prefix}`,
            payload,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            }
        );
    },

    getDetail(id: string) {
        return http.get<ApiResponse<Artist>>(`/${prefix}/detail/${id}`);
    },

    submitVerification(payload: FormData) {
        return http.post<ApiResponse<Artist>>(
            "/artist-verifications",
            payload,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            }
        );
    },

    getVerificationList(params: PaginationParam) {
        return http.get<ApiResponse<any[]>>(`/artist-verifications`, { params });
    },

    updateVerificationStatus(id: string, data: UpdateVerificationDto) {
        return http.patch<ApiResponse<any>>(
            `/artist-verifications/status/${id}`,
            data
        );
    },
};