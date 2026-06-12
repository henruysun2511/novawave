"use client";

import { RoomDetail, RoomMessage, RoomParticipant, RoomQueueItem, RoomRealtimeNotification, Song } from "@/types/object.type";

export interface SearchSongItem {
  _id: string;
  name: string;
  imageUrl: string;
  artistId?: { name?: string };
}

export function upsertQueueItem(items: RoomQueueItem[], incoming: RoomQueueItem) {
  const index = items.findIndex((item) => item._id === incoming._id);
  if (index === -1) {
    return [...items, incoming].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  }

  const next = [...items];
  next[index] = incoming;
  return next.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

export function getUserId(user: { _id?: string } | string | undefined | null) {
  if (!user) return "";
  if (typeof user === "string") return user;
  return user._id || "";
}

export function upsertParticipant(items: RoomParticipant[], incoming: RoomParticipant) {
  const index = items.findIndex((item) => item._id === incoming._id || getUserId(item.userId) === getUserId(incoming.userId));
  if (index === -1) return [incoming, ...items];
  const next = [...items];
  const existing = next[index];
  if (typeof incoming.userId === "string" && typeof existing.userId !== "string") {
    next[index] = { ...incoming, userId: existing.userId };
  } else {
    next[index] = incoming;
  }
  return next;
}

export function upsertMessage(items: RoomMessage[], incoming: RoomMessage) {
  const index = items.findIndex((item) => item._id === incoming._id);
  if (index === -1) return [incoming, ...items];
  const next = [...items];
  next[index] = incoming;
  return next;
}

export function createRealtimeMessage(type: RoomRealtimeNotification["type"], message: string, imageUrl?: string, queueItem?: RoomQueueItem) {
  return {
    id: `${type}-${Date.now()}-${Math.random()}`,
    type,
    message,
    createdAt: new Date().toISOString(),
    imageUrl,
    queueItem,
  } satisfies RoomRealtimeNotification;
}

export function getHostId(room: Partial<RoomDetail> | null | undefined) {
  if (!room?.hostId) return "";
  if (typeof room.hostId === "string") return room.hostId;
  return room.hostId._id || "";
}

export function getUserName(user: { username?: string } | string | undefined | null) {
  if (!user) return "Nguoi dung";
  if (typeof user === "string") return "Nguoi dung";
  return user.username || "Nguoi dung";
}

export function getUserAvatar(user: { avatar?: string } | string | undefined | null) {
  if (!user || typeof user === "string") return undefined;
  return user.avatar;
}

export function mergeRoomState(prev: RoomDetail | null, payload: Partial<RoomDetail>): RoomDetail | null {
  if (!prev) return payload as RoomDetail;

  const shouldKeepHostObject = !payload.hostId || typeof payload.hostId === "string";
  const nextQueue = payload.queue ?? prev.queue;

  const resolveSongFromPayload = (): Song | null => {
    if (payload.currentSong !== undefined) {
      return payload.currentSong as Song | null;
    }

    const rawSongId = payload.currentSongId ?? prev.currentSongId;
    const normalizedSongId =
      typeof rawSongId === "string"
        ? rawSongId
        : rawSongId?._id;

    if (!normalizedSongId) {
      return prev.currentSong ?? null;
    }

    const currentByQueueId = (payload.currentQueueItemId ?? prev.currentQueueItemId)
      ? nextQueue.find((item) => item._id === (payload.currentQueueItemId ?? prev.currentQueueItemId))?.songId
      : undefined;

    if (currentByQueueId?._id === normalizedSongId) {
      return currentByQueueId;
    }

    const currentBySongId = nextQueue.find((item) => item.songId?._id === normalizedSongId)?.songId;
    if (currentBySongId) {
      return currentBySongId;
    }

    if (prev.currentSong?._id === normalizedSongId) {
      return prev.currentSong;
    }

    return prev.currentSong ?? null;
  };

  return {
    ...prev,
    ...payload,
    hostId: shouldKeepHostObject ? prev.hostId : payload.hostId,
    queue: nextQueue,
    currentSong: resolveSongFromPayload(),
  } as RoomDetail;
}
