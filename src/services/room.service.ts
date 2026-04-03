import http from "@/libs/http";
import {
  AddRoomQueueItemDto,
  ApiResponse,
  CreateRoomMessageDto,
  CreateRoomDto,
  ModerateRoomParticipantDto,
  SyncRoomPlaybackDto,
  UpdateRoomDto,
  UpdateRoomQueueItemDto
} from "@/types/body.type";
import { Room, RoomDetail, RoomMessage, RoomParticipant, RoomQueueItem } from "@/types/object.type";
import { RoomParam } from "@/types/param.type";

const prefix = "rooms";

export const RoomService = {
  getList(params: RoomParam) {
    return http.get<ApiResponse<Room[]>>(`/${prefix}`, { params });
  },

  getMine() {
    return http.get<ApiResponse<Room[]>>(`/${prefix}/me`);
  },

  getDetail(id: string) {
    return http.get<ApiResponse<RoomDetail>>(`/${prefix}/${id}`);
  },

  create(payload: CreateRoomDto) {
    return http.post<ApiResponse<RoomDetail>>(`/${prefix}`, payload);
  },

  update(id: string, payload: UpdateRoomDto) {
    return http.patch<ApiResponse<Room>>(`/${prefix}/${id}`, payload);
  },

  remove(id: string) {
    return http.delete<ApiResponse<Room>>(`/${prefix}/${id}`);
  },

  getQueue(id: string) {
    return http.get<ApiResponse<RoomQueueItem[]>>(`/${prefix}/${id}/queue`);
  },

  addQueueItem(id: string, payload: AddRoomQueueItemDto) {
    return http.post<ApiResponse<RoomQueueItem>>(`/${prefix}/${id}/queue`, payload);
  },

  updateQueueItem(id: string, queueId: string, payload: UpdateRoomQueueItemDto) {
    return http.patch<ApiResponse<RoomQueueItem>>(`/${prefix}/${id}/queue/${queueId}`, payload);
  },

  removeQueueItem(id: string, queueId: string) {
    return http.delete<ApiResponse<RoomQueueItem>>(`/${prefix}/${id}/queue/${queueId}`);
  },

  syncPlayback(id: string, payload: SyncRoomPlaybackDto) {
    return http.post<ApiResponse<Room>>(`/${prefix}/${id}/sync`, payload);
  },

  getMessages(id: string, page = 1, size = 20) {
    return http.get<ApiResponse<RoomMessage[]>>(`/${prefix}/${id}/messages`, {
      params: { page, size },
    });
  },

  createMessage(id: string, payload: CreateRoomMessageDto) {
    return http.post<ApiResponse<RoomMessage>>(`/${prefix}/${id}/messages`, payload);
  },

  getParticipants(id: string) {
    return http.get<ApiResponse<RoomParticipant[]>>(`/${prefix}/${id}/participants`);
  },

  join(id: string) {
    return http.post<ApiResponse<{ room: Room; participant: RoomParticipant }>>(`/${prefix}/${id}/join`);
  },

  leave(id: string) {
    return http.post<ApiResponse<{ success: boolean }>>(`/${prefix}/${id}/leave`);
  },

  moderateParticipant(id: string, participantUserId: string, payload: ModerateRoomParticipantDto) {
    return http.post<ApiResponse<{ success: boolean }>>(
      `/${prefix}/${id}/participants/${participantUserId}/moderation`,
      payload
    );
  },
};
