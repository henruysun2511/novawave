import http from "@/libs/http";
import { ApiResponse } from "@/types/body.type";
import { Album, Song } from "@/types/object.type";
import { PaginationParam } from "@/types/param.type";

const prefix = "albums";

export const AlbumService = {
    getList(params: PaginationParam) {
        return http.get<ApiResponse<Album[]>>(`/${prefix}`, {params});
    },
    getListByArtist(artistId: string) {
        return http.get<ApiResponse<Album[]>>(`/${prefix}/${artistId}`);
    },
    getSongsInAlbum(albumId: string) {
        return http.get<ApiResponse<Song[]>>(`/${prefix}/songs/${albumId}`); 
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