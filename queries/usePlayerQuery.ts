import { PlayerService } from "@/services/player.service";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { PlayerDto } from "@/types/body.type";
import { NextTrack } from "@/types/object.type";
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
            // ✅ FIX 1: Dựa trên response API của bạn, dữ liệu Player nằm ở response.data.
            // setPlayerStatus(response.data.data); // Logic cũ (sai)
            setPlayerStatus(response.data.data); // Logic mới
        },
    });
};


export const useNextSong = () => {
    const setNowPlaying = usePlayerStore((state) => state.setNowPlaying); 

    return useMutation<any, unknown, SongIdPayload>({

        mutationFn: (payload: SongIdPayload) => PlayerService.next(payload.currentSongId),

        onSuccess: (response) => {
            const nextTrack = response.data.data as NextTrack;
            console.log(nextTrack)
            setNowPlaying(nextTrack.trackId);
        },
    });
};


export const usePreviousSong = () => {
    const setNowPlaying = usePlayerStore((state) => state.setNowPlaying); 

    return useMutation<any, unknown, SongIdPayload>({

        mutationFn: () => PlayerService.previous(),

        onSuccess: (response) => {
            const prevTrack = response.data.data as NextTrack;
            setNowPlaying(prevTrack.trackId);
        },
    });
};

// export const useStartPlayer = () => {
//     const setPlayerStatus = usePlayerStore((state) => state.setPlayerStatus);

//     return useMutation<any, unknown, PlayerDto>({
//         mutationFn: (data: PlayerDto) => PlayerService.start(data),

//         onSuccess: (response) => {
//             setPlayerStatus(response.data.data);
//         },
//     });
// };


// export const useNextSong = () => {
//     const setPlayerStatus = usePlayerStore((state) => state.setPlayerStatus);

//     return useMutation<any, unknown, SongIdPayload>({

//         mutationFn: (payload: SongIdPayload) => PlayerService.next(payload.currentSongId),

//         onSuccess: (response) => {
//             setPlayerStatus(response.data.data);
//         },
//     });
// };


// export const usePreviousSong = () => {
//     const setPlayerStatus = usePlayerStore((state) => state.setPlayerStatus);

//     return useMutation<any, unknown, SongIdPayload>({

//         mutationFn: () => PlayerService.previous(),

//         onSuccess: (response) => {
//             setPlayerStatus(response.data);
//         },
//     });
// };