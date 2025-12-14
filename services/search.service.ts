import http from "@/libs/http";

export const SearchService = {
    search: (keyword: string) =>
        http.get(`/search`, {
            params: { keyword },
        }),
};