import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const connectSocket = () => {
    const token = sessionStorage.getItem("accessToken") || localStorage.getItem("accessToken");
    if (!token) return;

    if (socket) {
        console.log("🟡 Socket already connected");
        return socket;
    }

    console.log("🟢 Connecting socket...");

    socket = io("http://novawave-backend.onrender.com", {
        transports: ["websocket"],
        auth: {
            token:token,
        },
    });

    socket.on("connect", () => {
        console.log("✅ Socket connected:", socket?.id);
    });

    // socket.on("connect_error", (err) => {
    //     console.error("❌ Socket connect error:", err.message);
    // });

    socket.on("disconnect", (reason) => {
        console.warn("⚠️ Socket disconnected:", reason);
    });

    return socket;
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
    if (socket) {
        console.log("🔴 Disconnecting socket...");
        socket.disconnect();
        socket = null;
    }
};