import http from "@/libs/http";
import { ApiResponse } from "@/types/body.type";

const prefix = "playlists";

export const PlaylistService = {
    getList() {
        return http.get<ApiResponse<Playlist[]>>(`/${prefix}`);
    },
    getDetail(id: string) {
        return http.get<ApiResponse<Playlist>>(`/${prefix}/${id}`);
    },
    create(payload: Partial<Playlist>) {
        return http.post<ApiResponse<Playlist>>(`/${prefix}`, payload);
    },
    update(id: string, payload: Partial<Playlist>) {
        return http.patch<ApiResponse<Playlist>>(`/${prefix}/${id}`, payload);
    },
    delete(id: string) {
        return http.delete<ApiResponse<null>>(`/${prefix}/${id}`);
    },
    addSong(playlistId: string, songId: string) {
        return http.post<ApiResponse<Playlist>>(
            `/${prefix}/${playlistId}/add-song`,
            { songId }
        );
    },
    removeSong(playlistId: string, songId: string) {
        return http.post<ApiResponse<Playlist>>(
            `/${prefix}/${playlistId}/remove-song`,
            { songId }
        );
    },
};