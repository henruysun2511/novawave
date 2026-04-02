import { AlbumService } from "@/services/album.service";
import { UpdateAlbumDto } from "@/types/body.type";
import { Album } from "@/types/object.type";
import { PaginationParam } from "@/types/param.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const ALBUM_QUERY_KEY = ["albums"];
export const SONGS_IN_ALBUM_QUERY_KEY = ["songs-in-album"]

export const useAlbumList = (params: PaginationParam) =>
    useQuery({
        queryKey: ALBUM_QUERY_KEY,
        queryFn: async () => (await AlbumService.getList(params)).data,
    });

export const useAlbumListByArtist = (artistId: string) =>
    useQuery({
        queryKey: [...ALBUM_QUERY_KEY, artistId],
        queryFn: async () => (await AlbumService.getListByArtist(artistId)).data,
        enabled: !!artistId,
    });

export const useSongsInAlbum = (albumId: string) =>
    useQuery({
        queryKey: [...SONGS_IN_ALBUM_QUERY_KEY, albumId],
        queryFn: async () => (await AlbumService.getSongsInAlbum(albumId)).data,
        enabled: !!albumId, 
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
        mutationFn: (payload: Album) => AlbumService.create(payload),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ALBUM_QUERY_KEY });
        },
    });
};

export const useUpdateAlbum = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: string, data: UpdateAlbumDto }) => AlbumService.update(id, data),
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
