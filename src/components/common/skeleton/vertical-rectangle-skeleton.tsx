import { Skeleton } from "antd";

export default function VerticalRectangleSkeleton() {
    return (
        <div className="flex gap-[20px] overflow-hidden">
            {[...Array(5)].map((_, i) => (
                <div key={i} className="flex-1 min-w-[200px]">
                    {/* Giả lập phần Image */}
                    <Skeleton.Button
                        active
                        block
                        style={{ height: 350, borderRadius: '12px' }}
                        className="bg-zinc-900/50 rounded-2xl"
                    />
                    {/* Giả lập phần Info */}
                    <div className="flex items-center gap-4 mt-4">
                        <Skeleton.Avatar active size={64} shape="square" className="bg-zinc-900/50 rounded-2xl" />
                        <div className="flex-1">
                            <Skeleton active paragraph={{ rows: 2, width: ['100%', '60%'] }} title={false} className="bg-zinc-900/50 rounded-2xl" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
