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
    currentTime: number;
    setCurrentTime: (time: number) => void;
    audioRef: HTMLAudioElement | null;
    setAudioRef: (ref: HTMLAudioElement | null) => void;
    seekToTime: (time: number) => void;
}

export const usePlayerStore = create<PlayerStore>()(
    persist(
        (set, get) => ({
            // Trạng thái khởi tạo
            status: {
                nowPlaying: null,
                queue: [],
                nowPlayingType: null,
            },
            isPlaying: false,
            currentTime: 0,
            audioRef: null,

            // Actions
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

            setAudioRef: (ref) => set({ audioRef: ref }),
            setCurrentTime: (time) => set({ currentTime: time }),

            // Logic Seek
            seekToTime: (time) => {
                const audio = get().audioRef;
                if (audio) {
                    audio.currentTime = time;
                    // Gọi action setCurrentTime của chính store
                    get().setCurrentTime(time);
                }
            },

        }),
        {
            name: 'music-player-storage',
            partialize: (state) => ({
                status: state.status,
                currentTime: state.currentTime,
            }),
            onRehydrateStorage: () => (state) => {
                if (state) {
                    state.isPlaying = false;
                }
            }
        }
    )
);