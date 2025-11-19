export default function SongInfo() {
    return (
        <div className="bg-[var(--background-secondary)] rounded-2xl overflow-hidden relative w-full h-[850px]">
            <video
                className="absolute top-0 left-0 w-full h-full object-cover"
                autoPlay
                loop
                muted
            >
                <source src="/videos/Download.mp4" type="video/mp4" />
            </video>
            <div>Hello</div>
        </div>
    )
}