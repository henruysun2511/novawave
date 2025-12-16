import { Player } from '@/types/object.type';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';


interface PlayerStatus extends Player {
    nowPlayingType: 'song' | 'advertisement' | null;
}

interface PlayerStore {
    status: PlayerStatus; 
    isPlaying: boolean;
    setPlayerStatus: (newStatus: PlayerStatus) => void; 
    setNowPlaying: (newTrackId: string, newType: 'song' | 'advertisement') => void; 
    play: () => void;
    pause: () => void;
}

export const usePlayerStore = create<PlayerStore>()(
    persist(
        (set) => ({
            status: {
                nowPlaying: null,
                queue: [],
                nowPlayingType: null,
            },
            isPlaying: false,

            setPlayerStatus: (newStatus) => set({ status: newStatus, isPlaying: true }),
            setNowPlaying: (newTrackId, newType) => set(state => ({
                status: {
                    ...state.status,
                    nowPlaying: newTrackId,
                    nowPlayingType: newType,
                },
                isPlaying: true,
            })),
            play: () => set({ isPlaying: true }),
            pause: () => set({ isPlaying: false }),
        }),
        {
            name: 'music-player-storage', 
            partialize: (state) => ({ 
                status: state.status, 
            }),
            onRehydrateStorage: () => (state) => {
                 if (state) {
                     state.isPlaying = false;
                 }
            }
        }
    )
);