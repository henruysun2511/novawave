import { PlayerService } from "@/services/player.service";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { PlayerDto, PlaySongDto } from "@/types/body.type";
import { PlaySongType } from "@/types/constant.type";
import { useMutation } from "@tanstack/react-query";

export const PLAYER_STATUS_KEY = ["player", "status"];

export const useStartPlayer = () => {
    const setPlayerStatus = usePlayerStore((state) => state.setPlayerStatus);

    return useMutation<any, unknown, PlayerDto>({
        mutationFn: (data: PlayerDto) => PlayerService.start(data),

        onSuccess: (response) => {
            const startStatus = response.data.data;

            const nowPlayingId = startStatus.nowPlayingId || (startStatus.nowPlaying && typeof startStatus.nowPlaying !== 'string' ? startStatus.nowPlaying._id : startStatus.nowPlaying);

            const playerStatusWithDefaultType = {
                ...startStatus,
                nowPlayingType: PlaySongType.SONG,
                nowPlayingId,
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
            const fullStatus = response.data.data;
            const nowPlayingId = fullStatus.nowPlayingId || (fullStatus.nowPlaying && typeof fullStatus.nowPlaying !== 'string' ? fullStatus.nowPlaying._id : fullStatus.nowPlaying);
            setNowPlaying({ ...fullStatus, nowPlayingId });
        },
    });
};

export const usePreviousSong = () => {
    const setNowPlaying = usePlayerStore((state) => state.setNowPlaying);

    return useMutation<any, unknown, PlaySongDto>({
        mutationFn: () => PlayerService.previous(),

        onSuccess: (response) => {
            const fullStatus = response.data.data;
            const nowPlayingId = fullStatus.nowPlayingId || (fullStatus.nowPlaying && typeof fullStatus.nowPlaying !== 'string' ? fullStatus.nowPlaying._id : fullStatus.nowPlaying);
            setNowPlaying({ ...fullStatus, nowPlayingId });
        },
    });
};

export const usePlayFromQueue = () => {
    const setPlayerStatus = usePlayerStore((state) => state.setPlayerStatus);

    return useMutation<any, unknown, { songId: string }>({
        mutationFn: ({ songId }) => PlayerService.playFromQueue(songId),

        onSuccess: (response) => {
            const startStatus = response.data.data;
            setPlayerStatus(startStatus);
        },
    });
};
