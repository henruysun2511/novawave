// import { Player } from '@/types/object.type';
// import { create } from 'zustand';


// interface PlayerStore {
//     status: Player;
//     isPlaying: boolean;

//     setPlayerStatus: (newStatus: Player) => void;
//     play: () => void;
//     pause: () => void;
// }

// export const usePlayerStore = create<PlayerStore>((set) => ({
//     status: {
//         nowPlaying: null,
//         queue: [],
//     },
//     isPlaying: false,
//     setPlayerStatus: (newStatus) => set({ status: newStatus, isPlaying: true }),

//     play: () => set({ isPlaying: true }),
//     pause: () => set({ isPlaying: false }),
// }));

import { Player } from '@/types/object.type';
import { create } from 'zustand';


interface PlayerStore {
    status: Player;
    isPlaying: boolean;

    setPlayerStatus: (newStatus: Player) => void;
    setNowPlaying: (newTrackId: string) => void; 
    play: () => void;
    pause: () => void;
}

export const usePlayerStore = create<PlayerStore>((set) => ({
    status: {
        nowPlaying: null,
        queue: [],
    },
    isPlaying: false,
    
    setPlayerStatus: (newStatus) => set({ status: newStatus, isPlaying: true }),
    setNowPlaying: (newTrackId) => set(state => ({
        status: {
            ...state.status, 
            nowPlaying: newTrackId, 
        },
        isPlaying: true, 
    })),

    play: () => set({ isPlaying: true }),
    pause: () => set({ isPlaying: false }),
}));