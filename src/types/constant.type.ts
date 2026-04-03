
export enum HttpMethod {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE',
}

export enum Gender {
    MALE = "male",
    FEMALE = "female",
    OTHER = "other"
}

export enum Role {
    ADMIN = "ADMIN",
    SUPER_ADMIN = "SUPPER ADMIN",
    USER = "USER",
    ARTIST = "ARTIST",
    CONTENT_MODERATOR = "CONTENT MODERATOR",
    COMMERCE_MANAGER = "COMMERCE MANAGER"
}

export enum UserStatus {
    ACTIVE = "active",
    INACTIVE = "inactive"
}

export enum VerificationStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected'
}

export enum SongStatus {
    ACTIVE = "active",
    INACTIVE = "inactive",
}

export enum SongReleseStatus {
  DRAFT = 'draft',
  SCHEDULED = 'scheduled',
  PUBLISHED = 'published'
}

export enum ReportTargetType {
  SONG = 'song',
  ARTIST = 'artist',
  USER = 'user',
  ALBUM = 'album',
  PLAYLIST = 'playlist'
}

export enum ReportStatus {
  PENDING = 'pending',
  RESOLVED = 'resolved', 
  REJECTED = 'rejected' 
}

export enum PlaylistStatus {
  PRIVATE = 'private',
  PUBLIC = 'public'
}


export enum NotificationType {
  SONG_FEAT_REQUEST = 'SONG_FEAT_REQUEST',
  SONG_PUBLISHED = 'SONG_PUBLISHED',
  GENERAL = 'GENERAL',
  NEW_FOLLOW = 'NEW_FOLLOW',
  NEW_LIKE = 'NEW_LIKE',
  NEW_SONG_RELEASE = 'NEW_SONG_RELEASE'
}

export enum PlaySongType{
    ADVERTISEMENT = 'advertisement',
    SONG = 'song'
}

export enum NewsStatus {
    DRAFT = 'draft',
    PUBLISHED = 'published',
    ARCHIVED = 'archived'
}

export enum RoomStatus {
    WAITING = "WAITING",
    STREAMING = "STREAMING",
    PAUSED = "PAUSED",
    ENDED = "ENDED",
}

export enum RoomSourceType {
    SONG = "SONG",
    ALBUM = "ALBUM",
    PLAYLIST = "PLAYLIST",
}

export enum RoomQueueItemStatus {
    PENDING = "PENDING",
    APPROVED = "APPROVED",
    REJECTED = "REJECTED",
    PLAYING = "PLAYING",
    PLAYED = "PLAYED",
    REMOVED = "REMOVED",
}

export enum RoomParticipantStatus {
    ACTIVE = "ACTIVE",
    LEFT = "LEFT",
    KICKED = "KICKED",
    BANNED = "BANNED",
}

export enum RoomParticipantRole {
    HOST = "HOST",
    LISTENER = "LISTENER",
}

export enum RoomModerationAction {
    KICK = "KICK",
    BAN = "BAN",
}

export enum RoomControlAction {
    PLAY = "PLAY",
    PAUSE = "PAUSE",
    SEEK = "SEEK",
    NEXT = "NEXT",
    END = "END",
    SYNC = "SYNC",
}


