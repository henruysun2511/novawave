import { SearchService } from "@/services/search.service";
import { SearchResult } from "@/types/object.type";
import { useQuery } from "@tanstack/react-query";

export const SEARCH_QUERY_KEY = ["search"];

function mapSearchData(data: any[]): SearchResult {
  return {
    songs: data[0] ?? [],
    artists: data[1] ?? [],
    albums: data[2] ?? [],
    playlists: data[3] ?? [],
    genres: data[4] ?? [],
  };
}

export const useSearch = (keyword: string) =>
  useQuery({
    queryKey: [...SEARCH_QUERY_KEY, keyword],
    queryFn: async () => {
      const res = await SearchService.search(keyword);
      return mapSearchData(res.data.data);
    },
    enabled: !!keyword,
  });