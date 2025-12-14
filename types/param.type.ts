import { ReportTargetType, UserStatus } from "./constant.type";

export interface PaginationParam {
    page?: number;
    size?: number;
}
export interface UserParam extends PaginationParam {
    email?: string,
    username?: string
    isPremium?: boolean
    status?: UserStatus;
    roleName?: string
}

export interface SongParam extends PaginationParam {
    genreNames?: string[];
    name?: string;
}

export interface ArtistParam extends PaginationParam {
    country?: string;
    name?: string;
    sort?: string;
}

export interface AdvertisementParam extends PaginationParam {
    keyword?: string;
    isActived?: boolean;
}

export interface ProductParam extends PaginationParam {
    name?: string;
    start?: number;
    end?: number;
}

export type FilterTargetType = ReportTargetType | 'all';

export interface ReportParam extends PaginationParam {
    page: number;
    size: number;
    targetType?: FilterTargetType;
}

export interface PermissionParam extends PaginationParam {
    name?: string;
    method?: string;
    module?: string;
}
