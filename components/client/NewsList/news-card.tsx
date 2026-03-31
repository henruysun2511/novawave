import { News } from "@/types/object.type";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";

interface Props {
    news: News;
}

export default function NewsCard({ news }: Props) {
    const router = useRouter();

    const handleGoDetail = () => {
        router.push(`/news/${news._id}`);
    };

    return (
        <div className="rounded-xl bg-[var(--background-tertiary)] overflow-hidden flex flex-col h-full shadow-sm hover:shadow-md transition-shadow">
            <div className="relative aspect-video cursor-pointer overflow-hidden" onClick={handleGoDetail}>
                <img 
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300" 
                    src={news.imageUrl || "https://placehold.co/600x400?text=No+Image"} 
                    alt={news.title} 
                />
            </div>
            <div className="p-4 flex flex-col flex-grow">
                <h3 
                    className="text-lg font-semibold text-text-primary mb-2 cursor-pointer hover:text-green line-clamp-2 transition-colors"
                    onClick={handleGoDetail}
                >
                    {news.title}
                </h3>
                <div className="mt-auto">
                    <p className="text-sm text-gray-500">
                        {dayjs(news.createdAt).format('DD/MM/YYYY')}
                    </p>
                </div>
            </div>
        </div>
    );
}