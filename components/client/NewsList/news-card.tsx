export default function NewsCard() {
    return (
        <>
            <div className="rounded-xl bg-[var(--background-tertiary)]">
                <img className="rounded-t-xl cursor-pointer object-cover" src="https://cdn.nhandan.vn/images/4655dea7deebadd3e7b51fbe3a4f19d5dc4c84c026bf969b47138c00dc31c1970cd890f29c22f298eb4dc2d7d3669f50/nguyenhung1.jpg" alt="" />
                <div className="p-4">
                    <h3 className="text-xl font-semibold text-text-primary mb-2 cursor-pointer hover:text-green">Còn gì đẹp hơn - nốt trầm xao xuyến của Nguyễn Hùng</h3>
                    <p className="text-base text-gray-500">20/11/2025</p>
                </div>
            </div>
        </>
    );
}