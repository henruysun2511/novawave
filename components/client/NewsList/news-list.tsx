import { News } from "@/types/object.type";
import NewsCard from "./news-card";

interface Props {
    newsList: News[];
}

export default function NewsList({ newsList }: Props) {
    if (!newsList || newsList.length === 0) {
        return (
            <div className="text-center py-10 text-gray-500">
                Không có tin tức nào được tìm thấy.
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {newsList.map((item) => (
                <NewsCard key={item._id} news={item} />
            ))}
        </div>
    );
}