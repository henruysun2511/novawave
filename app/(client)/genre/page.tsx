"use client";
import Footer from "@/components/client/footer/footer";
import SongCard from "@/components/client/SongList/song-card";
import { default as SquareSkeleton } from "@/components/ui/skeleton";
import Title from "@/components/ui/title";
import { useGenreList } from "@/queries/useGenreQuery";
import { useSongList } from "@/queries/useSongQuery";
import { Genre, Song } from "@/types/object.type";
import { Pagination } from "antd";
import { useEffect, useState } from "react";

const getRandomColor = () => {
    // Danh sách các màu tươi sáng, dễ nhìn trên nền trắng/sáng
    const colors = [
        "bg-red-500",
        "bg-blue-500",
        "bg-green-500",
        "bg-yellow-500",
        "bg-purple-500",
        "bg-pink-500",
        "bg-indigo-500",
        "bg-teal-500"
    ];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
};

export default function GenrePage() {
    const { data: genreData, isPending: isGenrePending } = useGenreList();
    const genres = genreData?.data;

    const [genreName, setGenreName] = useState<string>("");

    const [params, setParams] = useState({
        page: 1,
        genreNames: [] as string[],
    });

    const { data: songData, isPending: isSongPending } = useSongList(params);
    const songs = songData?.data;
    const meta = songData?.meta;

    useEffect(() => {
        if (genres && genres.length > 0 && !genreName) {
            setGenreName(genres[0].name);
            setParams((prev) => ({
                ...prev,
                genreNames: [genres[0].name],
            }));
        }
    }, [genres]);

    const handleClickGenre = (genre: Genre) => {
        setGenreName(genre.name);
        setParams((prev) => ({
            ...prev,
            page: 1,
            genreNames: [genre.name],
        }));
    };

    return (
        <>
            <div className="relative w-full h-[450px] mb-10">
                <img
                    src="https://i.pinimg.com/1200x/0c/44/a9/0c44a9d36d243a3929cafc07a33a24c9.jpg"
                    alt="Logo"
                    className="w-full h-full object-cover rounded-2xl"
                />
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="absolute bottom-0 left-0 z-20 p-4 w-full">
                    <div className="text-base text-white mb-1">
                        Khám phá đa dạng thể loại âm nhạc, đâu là gu của bạn?
                    </div>
                    <h3 className="uppercase text-7xl font-extrabold text-white mb-1 hover:text-green transition">
                        GENRES
                    </h3>
                </div>
            </div>

            <div className="p-6">
                {
                    isGenrePending ? (<SquareSkeleton />) : (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                            {genres &&
                                genres.map((genre: Genre) => (
                                    <div
                                        key={genre._id}
                                        className={`cursor-pointer relative rounded-lg overflow-hidden h-[180px] group transition-transform hover:scale-[1.02] ${getRandomColor()}`}
                                        onClick={() => handleClickGenre(genre)}
                                    >
                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition"></div>
                                        <div className="absolute bottom-4 left-4 z-10">
                                            <h4 className="text-2xl font-bold text-white uppercase">
                                                {genre.name}
                                            </h4>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    )
                }

                <div className="mb-10"></div>
                <Title>Danh sách bài hát thuộc thể loại {genreName}</Title>
                {isSongPending ? (
                    <SquareSkeleton />
                ) : songs && songs.length > 0 ? (
                    <>
                        <div className="grid grid-cols-4 gap-5 mt-6">
                            {songs.map((p: Song) => (
                                <SongCard key={p._id} song={p} />
                            ))}
                        </div>

                        <div className="mt-6 flex justify-center">
                            <Pagination
                                current={meta?.page ?? 1}
                                pageSize={meta?.size ?? 10}
                                total={meta?.totalElements ?? 0}
                                onChange={(page, size) =>
                                    setParams((prev) => ({
                                        ...prev,
                                        page,
                                        size,
                                    }))
                                }
                            />
                        </div>
                    </>
                ) : (
                    <div className="text-text-primary text-base">
                        Không có bài hát thuộc thể loại này
                    </div>
                )}

            </div>

            <Footer />
        </>
    );
}
