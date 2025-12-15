"use client";

import type { NotificationArgsProps } from "antd";
import { notification } from "antd";
import React, { createContext, useContext } from "react";

interface NotifyContextType {
  notify: (options: NotificationArgsProps) => void;
}

const NotifyContext = createContext<NotifyContextType | null>(null);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [api, contextHolder] = notification.useNotification();

  const notify = (options: NotificationArgsProps) => {
    api.open({
      placement: "topRight",
      duration: 4,
      ...options,
    });
  };

  return (
    <NotifyContext.Provider value={{ notify }}>
      {contextHolder}
      {children}
    </NotifyContext.Provider>
  );
}

export const useNotify = () => {
  const ctx = useContext(NotifyContext);
  if (!ctx) throw new Error("useNotify must be used inside NotificationProvider");
  return ctx;
};