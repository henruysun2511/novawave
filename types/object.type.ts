import { Gender, NotificationType, PlaylistStatus, ReportTargetType, SongReleseStatus, SongStatus, UserStatus, VerificationStatus } from "./constant.type";

export interface Role {
  _id: string,
  name: string
}

export interface User {
  _id: string,
  username: string,
  email: string,
  avatar: string
  gender: Gender,
  birthday: Date,
  isPremium: boolean,
  status: UserStatus,
  role: Role
  createdAt: Date,
  updatedAt: Date,
}

export interface Artist {
  _id: string,
  name: string,
  followers: number,
  createdAt: Date,
  updatedAt: Date,
  bannerUrl: string,
  avatarUrl: string,
  biography: string,
  country: string,
  artistId?: {
    _id: string,
    name: string
  },
  playerCount?: number
}

export interface Verification {
  _id: string,
  userId: {
    _id: string,
    username: string
  },
  fullName: string,
  stageName: string,
  bio: string,
  socialLinks: {
    facebook?: string,
    instagram?: string,
    tiktok?: string,
    youtube?: string
  },
  status: VerificationStatus,
  createdAt: Date,
  updateAt: Date
  identityImages: {
    front: string,
    back: string
  }
}

export interface Report {
  _id: string;
  status: string;
  targetId: string;
  targetType: ReportTargetType
  reason: string;
  description: string;
}

export interface Song {
  _id: string,
  name: string,
  artist: Artist,
  artistId: string | Artist,
  mp3Link: string,
  lyrics?: string,
  imageUrl: string,
  genreNames: string[],
  featArtists: Artist[],
  featArtistIds: any,
  albumId?: Album,
  duration: number,
  explicit: boolean,
  releaseStatus: SongReleseStatus,
  releseStatus: SongReleseStatus,
  releaseAt: Date,
  status: SongStatus,
  likesCount: number,
  popularity: number,
  createdAt: string,
  updatedAt: string,
  likeCount: number,
  playCount?: number,
  album?: Album,
}

export interface Album {
  _id: string,
  img: string,
  name: string,
  release_date?: Date,
  artists: string[],
  createAt: Date,
  updateAt: Date,
  album_type: string,
  label: string,
  total_songs: number,
  artist: string
}


export interface Genre {
  _id: string,
  name: string
}

export interface Advertisement {
  _id: string;
  title: string;
  description?: string;
  partner: string;
  audioUrl?: string;
  bannerUrl?: string;
  isActived: boolean;
}

export interface Product {
  _id: string;
  name: string;
  stock: number;
  price: number;
  img: string;
  productId: string
  quantity: number
}

export interface Comment {
  content: string,
  songId: string
}

export interface Playlist {
  _id: string,
  name: string,
  description: string,
  status: PlaylistStatus,
  img: string,
}

export interface Permission {
  _id: string,
  name: string,
  method: string,
  path: string;
  module: string;
  description?: string;
}

export interface Role {
  _id: string,
  name: string,
  description?: string;
  permissions?: string[],
}

export interface Notification {
  _id: string,
  type: NotificationType,
  title: string,
  message: string,
  isRead: boolean,
  createdAt: Date,
}

export interface Player {
  nowPlaying: string | null,
  queue: string[]
}

export interface Cart {
  _id: string
  products: Product[]
  totalPrice: number,
}

export interface Plan {
  _id: string;
  planName: string;
  price: number;
  durationInMonths: number;
  description?: string;
  deleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SearchResult {
  songs: any[];
  artists: any[];
  albums: any[];
  playlists: any[];
  genres: any[];
}

export interface Upload {
  url: string,
  duration?: number
}

export interface Payment {
  checkoutUrl: string;
  status: string;
}

export interface NextTrack {
  type: 'song' | 'advertisement';
  trackId: string;
  random?: boolean;
  previous?: boolean;
}