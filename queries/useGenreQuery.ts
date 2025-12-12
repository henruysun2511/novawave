import { GenreService } from "@/services/genre.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const GENRE_QUERY_KEY = ["genres"];

export const useGenreList = (params?: any) => {
    return useQuery({
        queryKey: [...GENRE_QUERY_KEY, params],
        queryFn: async () => {
            const res = await GenreService.getList(params);
            return res.data;
        },
    });
};

export const useCreateGenre = () => {
    const qc = useQueryClient();

    return useMutation({
        mutationFn: GenreService.create,
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: GENRE_QUERY_KEY });
        },
    });
};

export const useUpdateGenre = () => {
    const qc = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: Partial<Genre> }) =>
            GenreService.update(id, data),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: GENRE_QUERY_KEY });
        },
    });
}; 

export const useDeleteGenre = () => {
    const qc = useQueryClient();

    return useMutation({
        mutationFn: GenreService.delete,
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: GENRE_QUERY_KEY });
        },
    });
};