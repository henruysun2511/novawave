import http from "@/libs/http";
import { ApiResponse } from "@/types/body.type";
import { Playlist } from "@/types/object.type";
import { PaginationParam } from "@/types/param.type";

const prefix = "playlists";

export const PlaylistService = {
    getList(params: PaginationParam) {
        return http.get<ApiResponse<Playlist[]>>(`/${prefix}`, {
            params
        });
    },
    getDetail(id: string) {
        return http.get<ApiResponse<Playlist>>(`/${prefix}/detail/${id}`);
    },
    create(payload: Partial<Playlist>) {
        return http.post<ApiResponse<Playlist>>(`/${prefix}`, payload);
    },
    update(id: string, payload: Partial<Playlist>) {
        return http.put<ApiResponse<Playlist>>(`/${prefix}/${id}`, payload);
    },
    delete(id: string) {
        return http.delete<ApiResponse<null>>(`/${prefix}/${id}`);
    },
    addSong(playlistId: string, songId: string) {
        return http.patch<ApiResponse<Playlist>>(
            `/${prefix}/${playlistId}/add-song`,
            { songId }
        );
    },
    removeSong(playlistId: string, songId: string) {
        return http.patch<ApiResponse<Playlist>>(
            `/${prefix}/${playlistId}/remove-song`,
            { songId }
        );
    },

    getPlaylistSong(playlistId: string) {
        return http.get<ApiResponse<Playlist[]>>(`/${prefix}/songs/${playlistId}`);
    },

    getAdminList(params?: PaginationParam) {
        // Giả định prefix cho admin là /admin
        return http.get<ApiResponse<Playlist[]>>(`/admin/${prefix}`, {
            params
        });
    },
    getUserPlaylists(params?: PaginationParam) {
        return http.get<ApiResponse<Playlist[]>>(`/${prefix}/users`, {
            params
        });
    },
};