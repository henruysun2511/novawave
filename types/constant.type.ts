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
