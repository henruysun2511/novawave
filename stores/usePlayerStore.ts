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
}

export const usePlayerStore = create<PlayerStore>()(
    persist(
        (set) => ({
            // Trạng thái khởi tạo BẮT BUỘC phải khớp với PlayerStore interface
            status: {
                nowPlaying: null,
                queue: [],
                nowPlayingType: null,
            },
            isPlaying: false,

            // ✅ SỬA LỖI: Thêm giá trị khởi tạo cho currentTime
            currentTime: 0,

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
            setCurrentTime: (time) => set({ currentTime: time }),

        }),
        {
            name: 'music-player-storage',
            partialize: (state) => ({
                status: state.status,
                // ✅ NẾU MUỐN LƯU VỊ TRÍ TUA KHI LOAD LẠI TRANG, thêm currentTime vào đây:
                // currentTime: state.currentTime, 
            }),
            onRehydrateStorage: () => (state) => {
                if (state) {
                    state.isPlaying = false;
                }
            }
        }
    )
);