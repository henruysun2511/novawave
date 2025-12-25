import { UserJwtPayload } from "./body.type";
import { Player } from "./object.type";


type RightPanelMode = "info" | "queue" | "hidden";

interface PlayerStatus extends Player {
    nowPlayingType: 'song' | 'advertisement' | null;
}

export interface PlayerStore {
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

export interface PlayerState {
  rightPanelMode: RightPanelMode;
  middleSize: string;

  showInfo: () => void;
  showQueue: () => void;
  hideRightPanel: () => void;
  resetLayout: () => void;
}


export interface AuthState {
  isAuthenticated: boolean,
  accessToken: string | null;
  user: UserJwtPayload | null;
  email: string | null;
  roleName: string | null;
  setAuth: (token: string, user: UserJwtPayload) => void;
  setEmail: (email: string) => void;
  setRoleName: (roleName: string) => void;
  logout: () => void;
}
