type RightPanelMode = "info" | "queue" | "hidden";

export interface PlayerState {
  rightPanelMode: RightPanelMode;
  middleSize: string;

  showInfo: () => void;
  showQueue: () => void;
  hideRightPanel: () => void;
}

export type User = {
  id: string;
  name?: string;
  email?: string;
  [k: string]: any;
};

export interface AuthState {
  accessToken: string | null;
  user: User | null;
  setAuth: (accessToken: string, user?: User | null) => void;
  setAccessToken: (token: string | null) => void;
  setUser: (user: User | null) => void;
  logout: () => void;
}
