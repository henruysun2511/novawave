import { CheckCircleFilled, GiftFilled, HeartFilled, InfoCircleFilled, UserAddOutlined } from "@ant-design/icons";

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

export enum HttpMethod {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE',
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

export const NOTIFICATION_CONFIG = {
    [NotificationType.SONG_FEAT_REQUEST]: { 
        icon: UserAddOutlined, 
        color: 'text-orange-400' 
    },
    [NotificationType.SONG_PUBLISHED]: { 
        icon: CheckCircleFilled, 
        color: 'text-green-500' 
    },
    [NotificationType.GENERAL]: { 
        icon: InfoCircleFilled, 
        color: 'text-blue-400' 
    },
    [NotificationType.NEW_FOLLOW]: { 
        icon: UserAddOutlined, 
        color: 'text-purple-400' 
    },
    [NotificationType.NEW_LIKE]: { 
        icon: HeartFilled, 
        color: 'text-red-500' 
    },
    [NotificationType.NEW_SONG_RELEASE]: { 
        icon: GiftFilled, 
        color: 'text-pink-500' 
    },
};

export const METHOD_TEXT_COLORS: Record<HttpMethod, string> = {
    [HttpMethod.GET]: 'text-green-600',
    [HttpMethod.POST]: 'text-blue-600',
    [HttpMethod.PUT]: 'text-yellow-600',
    [HttpMethod.PATCH]: 'text-indigo-600',
    [HttpMethod.DELETE]: 'text-red-600',
};
