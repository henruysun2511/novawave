import { PlayerState } from "@/types/state.type";
import { create } from "zustand";

export const useSidebarStore = create<PlayerState>((set) => ({
  rightPanelMode: "info",
  middleSize: "85%",

  showInfo: () =>
    set({
      rightPanelMode: "info",
      middleSize: "70%",
    }),

  showQueue: () =>
    set({
      rightPanelMode: "queue",
      middleSize: "70%",
    }),

  hideRightPanel: () =>
    set({
      rightPanelMode: "hidden",
      middleSize: "85%",
    }),

  resetLayout: () =>
    set({
      rightPanelMode: "hidden",
      middleSize: "85%",
    }),
}));