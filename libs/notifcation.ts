import { useNotify } from "@/components/provider/NotificationProvider";
import { getSocket } from "@/libs/socket";
import { useEffect } from "react";


export function useNotificationSocket() {
  const { notify } = useNotify();

  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    socket.on("notification", (data) => {
      console.log("Received socket notification:", data);
      notify({
        message: data.title,
        description: data.message,
        type: "info",
      });
    });

    return () => {
      socket.off("notification");
    };
  }, []);
}