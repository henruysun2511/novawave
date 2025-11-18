
export default function AdvertisementBanner() {
    return (
        <div className="relative w-full h-100 md:h-100 rounded-2xl overflow-hidden shadow-lg">
            <div className="absolute top-0 left-0 z-0 w-full h-full">
                <img
                    className="w-full h-full object-cover"
                    src="https://i.pinimg.com/1200x/29/a7/68/29a768352314cb44d1c9984eacdef30b.jpg"
                    alt="Volna Music Background"
                />
            </div>

            <div className="absolute top-0 left-0 z-0 w-full h-full bg-black opacity-40"></div>
            <div className="absolute top-0 left-0 z-10 w-full h-full flex flex-col justify-start mx-3.5 md:p-10 text-white">
                <h1 className="text-3xl md:text-4xl font-opensans uppercase font-bold mb-6 leading-tight">
                    Khám Phá Bản Giao Hưởng Của Cuộc Sống, Lắng Nghe Mọi Con Sóng Cảm Xúc
                </h1>

                <h3 className="text-sm text-text-secondary md:text-lg font-medium max-w-3xl opacity-90 mb-6 color-[var(--text-secondary)]">
                    Volna là nền tảng phát nhạc trực tuyến được thiết kế để đưa bạn đắm chìm vào một thế giới âm thanh không giới hạn. Với thư viện khổng lồ gồm hàng triệu bài hát từ mọi thể loại, từ Pop, Rock đến Lo-fi và nhạc Cổ điển, Volna đảm bảo bạn sẽ luôn tìm thấy "con sóng" âm nhạc phù hợp với tâm trạng của mình.
                </h3>
                <div className="flex gap-4 mt-4">
                    <div className="base-button">Khám phá ngay</div>
                    <div className="base-button !bg-gray-500">Nghe nhạc nào</div>
                </div>
            </div>

        </div>
    );
}