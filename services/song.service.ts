import http from "@/libs/http";
import { ApiResponse } from "@/types/body.type";
import { Song } from "@/types/object.type";
import { SongParam } from "@/types/param.type";

const prefix = "songs";

export const SongService = {
    getList(params: SongParam) {
        const query = new URLSearchParams();

        // genreNames luôn gửi ít nhất 2 param
        if (params.genreNames && params.genreNames.length > 0) {
            params.genreNames.forEach((g) => query.append("genreNames", g));
            if (params.genreNames.length === 1) {
                query.append("genreNames", ""); // thêm param rỗng nếu chỉ có 1
            }
        }
        
        if (params.page) query.append("page", params.page.toString());
        if (params.name) query.append("name", params.name);

        return http.get<ApiResponse<Song[]>>(`/${prefix}?${query.toString()}`);
    },

    getListByAdmin(params: SongParam) {
        const query = new URLSearchParams();

        // genreNames luôn gửi ít nhất 2 param
        if (params.genreNames && params.genreNames.length > 0) {
            params.genreNames.forEach((g) => query.append("genreNames", g));
            if (params.genreNames.length === 1) {
                query.append("genreNames", ""); // thêm param rỗng nếu chỉ có 1
            }
        }
        
        if (params.page) query.append("page", params.page.toString());
        if (params.size) query.append("size", params.size.toString());
        if (params.name) query.append("name", params.name);

        return http.get<ApiResponse<Song[]>>(`/admin/${prefix}?${query.toString()}`);
    },

    getListByArtist(artistId: string) {
        return http.get<ApiResponse<Song[]>>(`/${prefix}/${artistId}`);
    },

    getDetail(id: string) {
        return http.get<ApiResponse<Song>>(`/${prefix}/detail/${id}`);
    },
    create(payload: Song) {
        return http.post<ApiResponse<Song>>(`/${prefix}`, payload);
    },
    update(id: string, payload: Song) {
        return http.put<ApiResponse<Song>>(`/${prefix}/${id}`, payload);
    },
    delete(id: string) {
        return http.delete<ApiResponse<null>>(`/${prefix}/${id}`);
    },
    deleteByAdmin(id: string) {
        return http.delete<ApiResponse<null>>(`/admin/${prefix}/${id}`);
    },
    updateStatus(body: any) {
        return http.patch<ApiResponse<Song>>(`/${prefix}/update-status`, body);
    },

    getTopSongs() {
        return http.get<ApiResponse<Song[]>>(`/${prefix}/top`);
    },
};