import http from "@/libs/http";
import { ApiResponse } from "@/types/body.type";
import { Album } from "@/types/object.type";

const prefix = "albums";

export const AlbumService = {
    getList() {
        return http.get<ApiResponse<Album[]>>(`/${prefix}`);
    },
    getListByArtist(artistId: string) {
        return http.get<ApiResponse<Album[]>>(`/${prefix}/${artistId}`);
    },
    getDetail(id: string) {
        return http.get<ApiResponse<Album>>(`/${prefix}/detail/${id}`);
    },
    create(payload: FormData) {
        return http.post<ApiResponse<Album>>(`/${prefix}`, payload);
    },
    update(id: string, payload: FormData) {
        return http.put<ApiResponse<Album>>(`/${prefix}/${id}`, payload);
    },
    delete(id: string) {
        return http.delete<ApiResponse<null>>(`/${prefix}/${id}`);
    },
};