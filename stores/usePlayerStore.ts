import { PlayerStore } from '@/types/state.type';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';




export const usePlayerStore = create<PlayerStore>()(
    persist(
        (set, get) => ({
            // Trạng thái khởi tạo
            status: {
                nowPlayingId: null,
                nowPlaying: null,
                queueIds: [],
                queue: [],
                history: [],
                nowPlayingType: null,
            },
            isPlaying: false,
            currentTime: 0,
            audioRef: null,

            // Actions
            setPlayerStatus: (newStatus) => set({ status: newStatus, isPlaying: true }),
            setNowPlaying: (fullStatus: any) => set({ status: fullStatus, isPlaying: true }),
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
                    
                    // Dispatch timeupdate event để ensure UI cập nhật
                    const timeupdate = new Event('timeupdate');
                    audio.dispatchEvent(timeupdate);
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