import http from "@/libs/http";
import { ApiResponse, PlayerDto } from "@/types/body.type";
import { Player } from "@/types/object.type";

const prefix = 'player';

export const PlayerService = {
    start(payload: PlayerDto) {
        return http.post<ApiResponse<Player>>(`/${prefix}/start`, payload);
    },

    next(currentSongId: string) {
        return http.get<ApiResponse<Player>>(`/${prefix}/next`, {
            params: { currentSongId },
        });
    },

    previous() {
        return http.get<ApiResponse<Player>>(`/${prefix}/previous`);
    },
};