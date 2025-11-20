import NewsCard from "./news-card";

export default function NewsList() {
    return (
        <>
            <div className="grid grid-cols-3 gap-4">
                <NewsCard />
                <NewsCard />
                <NewsCard />
            </div>
        </>
    );
}