import { ArtistService } from "@/services/artist.service"; // Import service vừa tạo
import { UpdateVerificationDto } from "@/types/body.type";
import { ArtistParam, PaginationParam } from "@/types/param.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const ARTIST_QUERY_KEY = ["artists"];
export const ARTIST_ADMIN_QUERY_KEY = ["artists", "admin"];
export const ARTIST_PROFILE_QUERY_KEY = ["artist", "profile"];
export const VERIFICATION_QUERY_KEY = ["artist-verifications"];

export const useArtistList = (params: ArtistParam) =>
    useQuery({
        queryKey: [...ARTIST_QUERY_KEY, params],
        queryFn: async () => (await ArtistService.getList(params)).data,
    });


export const useArtistListAdmin = (params: ArtistParam) =>
    useQuery({
        queryKey: [...ARTIST_ADMIN_QUERY_KEY, params],
        queryFn: async () => (await ArtistService.getListAdmin(params)).data,
    });


export const useArtistProfile = () =>
    useQuery({
        queryKey: ARTIST_PROFILE_QUERY_KEY,
        queryFn: async () => (await ArtistService.getProfile()).data,
    });

export const useArtistDetail = (id: string) =>
    useQuery({
        queryKey: [...ARTIST_QUERY_KEY, id],
        queryFn: async () => (await ArtistService.getDetail(id)).data,
    });


export const useSubmitVerification = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: ArtistService.submitVerification,
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ARTIST_ADMIN_QUERY_KEY });
        },
    });
};

export const useVerificationList = (params: PaginationParam) =>
    useQuery({
        queryKey: [...VERIFICATION_QUERY_KEY, params],
        queryFn: async () => (await ArtistService.getVerificationList(params)).data,
    });

export const useUpdateVerification = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: string, data: UpdateVerificationDto }) =>
            ArtistService.updateVerificationStatus(id, data),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: VERIFICATION_QUERY_KEY });
        },
    });
};