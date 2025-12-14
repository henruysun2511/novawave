export enum Gender {
    MALE = "male",
    FEMALE = "female",
    OTHER = "other"
}

export enum Role {
    ADMIN = "ADMIN",
    SUPER_ADMIN = "SUPER ADMIN",
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

export const METHOD_TEXT_COLORS: Record<HttpMethod, string> = {
    [HttpMethod.GET]: 'text-green-600',
    [HttpMethod.POST]: 'text-blue-600',
    [HttpMethod.PUT]: 'text-yellow-600',
    [HttpMethod.PATCH]: 'text-indigo-600',
    [HttpMethod.DELETE]: 'text-red-600',
};
