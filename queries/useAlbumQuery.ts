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

const albumMutation = (fn: any) => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: fn,
        onSuccess: () => qc.invalidateQueries({ queryKey: ALBUM_QUERY_KEY }),
    });
};

export const useCreateAlbum = () => albumMutation(AlbumService.create);
export const useUpdateAlbum = () =>
    albumMutation(({ id, data }: any) => AlbumService.update(id, data));
export const useDeleteAlbum = () => albumMutation(AlbumService.delete);
