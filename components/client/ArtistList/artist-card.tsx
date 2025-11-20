
export default function ArtistCard() {
    return (
        <>
            <div className="group flex flex-col cursor-pointer my-2 w-[180px] rounded-xl p-2">
                <img
                    className="w-full h-full object-cover rounded-full"
                    src="https://media.vov.vn/sites/default/files/styles/large/public/2021-01/bts_jungkook_pics.jpg"
                    alt=""
                />
                <a className="text-base text-text-primary font-bold mt-2 text-center">
                    Jungkook
                </a>
            </div>
        </>
    );
}