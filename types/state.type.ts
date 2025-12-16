import { UserJwtPayload } from "./body.type";


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
  user: UserJwtPayload | null;
  email: string | null;
  roleName: string | null;
  setAuth: (token: string, user: UserJwtPayload) => void;
  setEmail: (email: string) => void;
  setRoleName: (roleName: string) => void;
  logout: () => void;
}
