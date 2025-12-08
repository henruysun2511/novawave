import { JwtPayload } from "jwt-decode";

type RightPanelMode = "info" | "queue" | "hidden";

export interface PlayerState {
  rightPanelMode: RightPanelMode;
  middleSize: string;

  showInfo: () => void;
  showQueue: () => void;
  hideRightPanel: () => void;
}


export interface AuthState {
  isAuthenticated: boolean,
  accessToken: string | null;
  user: JwtPayload | null;
  setAuth: (token: string, user: JwtPayload) => void;
  logout: () => void;
}
