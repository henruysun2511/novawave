import { PlayerService } from "@/services/player.service";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { PlayerDto } from "@/types/body.type";
import { useMutation } from "@tanstack/react-query";

export const PLAYER_STATUS_KEY = ["player", "status"];

export interface SongIdPayload {
    currentSongId: string;
}

export const useStartPlayer = () => {
    const setPlayerStatus = usePlayerStore((state) => state.setPlayerStatus);

    return useMutation<any, unknown, PlayerDto>({
        mutationFn: (data: PlayerDto) => PlayerService.start(data),

        onSuccess: (response) => {
            setPlayerStatus(response.data.data);
        },
    });
};


export const useNextSong = () => {
    const setPlayerStatus = usePlayerStore((state) => state.setPlayerStatus);

    return useMutation<any, unknown, SongIdPayload>({

        mutationFn: (payload: SongIdPayload) => PlayerService.next(payload.currentSongId),

        onSuccess: (response) => {
            setPlayerStatus(response.data.data);
        },
    });
};


export const usePreviousSong = () => {
    const setPlayerStatus = usePlayerStore((state) => state.setPlayerStatus);

    return useMutation<any, unknown, SongIdPayload>({

        mutationFn: () => PlayerService.previous(),

        onSuccess: (response) => {
            setPlayerStatus(response.data);
        },
    });
};