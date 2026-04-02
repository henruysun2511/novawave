import { Skeleton } from "antd";

export default function CircleSkeleton() {
    return (
        <>
            <div className="p-6">
                <div className="flex gap-5 flex-wrap">
                    <Skeleton.Avatar active={true} size={150} shape="square" className="bg-zinc-900/50 rounded-full" />
                    <Skeleton.Avatar active={true} size={150} shape="square" className="bg-zinc-900/50 rounded-full" />
                    <Skeleton.Avatar active={true} size={150} shape="square" className="bg-zinc-900/50 rounded-full" />
                    <Skeleton.Avatar active={true} size={150} shape="square" className="bg-zinc-900/50 rounded-full" />
                    <Skeleton.Avatar active={true} size={150} shape="square" className="bg-zinc-900/50 rounded-full" />
                    <Skeleton.Avatar active={true} size={150} shape="square" className="bg-zinc-900/50 rounded-full" />
                    <Skeleton.Avatar active={true} size={150} shape="square" className="bg-zinc-900/50 rounded-full" />
                    <Skeleton.Avatar active={true} size={150} shape="square" className="bg-zinc-900/50 rounded-full" />
                    <Skeleton.Avatar active={true} size={150} shape="square" className="bg-zinc-900/50 rounded-full" />
                    <Skeleton.Avatar active={true} size={150} shape="square" className="bg-zinc-900/50 rounded-full" />
                    <Skeleton.Avatar active={true} size={150} shape="square" className="bg-zinc-900/50 rounded-full" />
                    <Skeleton.Avatar active={true} size={150} shape="square" className="bg-zinc-900/50 rounded-full" />
                    <Skeleton.Avatar active={true} size={150} shape="square" className="bg-zinc-900/50 rounded-full" />
                    <Skeleton.Avatar active={true} size={150} shape="square" className="bg-zinc-900/50 rounded-full" />
                </div>

            </div>
        </>
    )
}