import { AlbumService } from "@/services/album.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const ALBUM_QUERY_KEY = ["albums"];

export const useAlbumList = () =>
    useQuery({
        queryKey: ALBUM_QUERY_KEY,
        queryFn: async () => (await AlbumService.getList()).data,
    });

export const useAlbumListByArtist = (artistId: string) =>
    useQuery({
        queryKey: [...ALBUM_QUERY_KEY, artistId], 
        queryFn: async () => (await AlbumService.getListByArtist(artistId)).data,
        enabled: !!artistId, 
    });



export const useAlbumDetail = (id: string) =>
    useQuery({
        queryKey: [...ALBUM_QUERY_KEY, id],
        queryFn: async () => (await AlbumService.getDetail(id)).data,
        enabled: !!id,
    });

export const useCreateAlbum = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: AlbumService.create, 
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ALBUM_QUERY_KEY });
        },
    });
};

export const useUpdateAlbum = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: {id: string, data: FormData}) => AlbumService.update(id, data),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ALBUM_QUERY_KEY });
        },
    });
};

export const useDeleteAlbum = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => AlbumService.delete(id),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ALBUM_QUERY_KEY });
        },
    });
};
