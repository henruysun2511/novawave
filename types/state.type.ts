import { JwtPayload } from "./body.type";


type RightPanelMode = "info" | "queue" | "hidden";

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
  user: JwtPayload | null;
  email: string | null;
  roleName: string | null;
  setAuth: (token: string, user: JwtPayload) => void;
  setEmail: (email: string) => void;
  setRoleName: (roleName: string) => void;
  logout: () => void;
}
