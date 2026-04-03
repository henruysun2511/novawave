"use client";

import { connectSocket, getSocket } from "@/libs/socket";
import { useEffect } from "react";

type RoomSocketHandler = {
  bivarianceHack: (...args: unknown[]) => void;
}["bivarianceHack"];

export function useRoomSocket<T extends Record<string, unknown>>(roomId: string, handlers: T) {
  useEffect(() => {
    if (!roomId) return;

    const socket = getSocket() ?? connectSocket();
    if (!socket) return;

    const joinRoom = () => {
      socket.emit("JOIN_ROOM", { roomId });
    };

    if (socket.connected) {
      joinRoom();
    } else {
      socket.on("connect", joinRoom);
    }

    return () => {
      socket.emit("LEAVE_ROOM", { roomId });
      socket.off("connect", joinRoom);
    };
  }, [roomId]);

  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    const handlerEntries = Object.entries(handlers as Record<string, RoomSocketHandler | undefined>);

    handlerEntries.forEach(([eventName, handler]) => {
      if (handler) {
        socket.on(eventName, handler);
      }
    });

    return () => {
      handlerEntries.forEach(([eventName, handler]) => {
        if (handler) {
          socket.off(eventName, handler);
        }
      });
    };
  }, [handlers]);
}

