import { Gender, UserStatus, VerificationStatus } from "./constant.type";

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
}

export interface Artist {
  _id: string,
  name: string
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

export interface Song {
  _id: string,
  name: string
  artistId: Artist
  imageUrl: string
}

export interface Album {
  _id: string,
  img: string,
  release_date?: Date,
  artists: string[]
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
}