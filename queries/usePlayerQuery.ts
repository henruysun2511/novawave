import { PlayerService } from "@/services/player.service";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { PlayerDto, PlaySongDto } from "@/types/body.type";
import { PlaySongType } from "@/types/constant.type";
import { NextTrack } from "@/types/object.type";
import { useMutation } from "@tanstack/react-query";

export const PLAYER_STATUS_KEY = ["player", "status"];

export const useStartPlayer = () => {
    const setPlayerStatus = usePlayerStore((state) => state.setPlayerStatus);

    return useMutation<any, unknown, PlayerDto>({
        mutationFn: (data: PlayerDto) => PlayerService.start(data),

        onSuccess: (response) => {
            const startStatus = response.data.data;

            const playerStatusWithDefaultType = {
                ...startStatus,
                nowPlayingType: PlaySongType.SONG, 
            };
            
            setPlayerStatus(playerStatusWithDefaultType); 
        },
    });
};

export const useNextSong = () => {
    const setNowPlaying = usePlayerStore((state) => state.setNowPlaying);

    return useMutation<any, unknown, PlaySongDto>({
        mutationFn: (payload: PlaySongDto) => PlayerService.next(payload.currentSongId),

        onSuccess: (response) => {
            const nextTrack = response.data.data as NextTrack;
            
            setNowPlaying(nextTrack.trackId, nextTrack.type);
        },
    });
};

export const usePreviousSong = () => {
    const setNowPlaying = usePlayerStore((state) => state.setNowPlaying);

    return useMutation<any, unknown, PlaySongDto>({
        mutationFn: () => PlayerService.previous(),

        onSuccess: (response) => {
            const prevTrack = response.data.data as NextTrack; 
            
            setNowPlaying(prevTrack.trackId, prevTrack.type || PlaySongType.SONG); 
        },
    });
};
