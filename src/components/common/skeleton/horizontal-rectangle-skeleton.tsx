import { Skeleton } from "antd";

interface Props {
    count?: number;
}

export default function HorizontalRectangleSkeleton({ count = 6 }: Props) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(count)].map((_, i) => (
                <div
                    key={i}
                    className="rounded-xl overflow-hidden flex flex-col"
                    style={{ background: "var(--background-tertiary)" }}
                >
                    {/* Giả lập phần ảnh (aspect-video) */}
                    <Skeleton.Button
                        active
                        block
                        style={{ height: 200, borderRadius: 0, display: "block" }}
                    />

                    {/* Giả lập phần nội dung */}
                    <div className="p-4 flex flex-col gap-3">
                        {/* Title */}
                        <Skeleton
                            active
                            title={{ width: "100%" }}
                            paragraph={{ rows: 1, width: "70%" }}
                        />

                        {/* Date */}
                        <Skeleton.Button
                            active
                            style={{ height: 14, width: 80, borderRadius: 6 }}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}
