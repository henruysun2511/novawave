import { Skeleton } from "antd";

export default function SquareSkeleton() {
    return (
        <>
            <div className="p-6">
                <div className="flex gap-5 flex-wrap">
                    <Skeleton.Avatar active={true} size={150} shape="square" className="bg-[var(--background-secondary)] rounded-2xl" />
                    <Skeleton.Avatar active={true} size={150} shape="square" className="bg-[var(--background-secondary)] rounded-2xl" />
                    <Skeleton.Avatar active={true} size={150} shape="square" className="bg-[var(--background-secondary)] rounded-2xl" />
                    <Skeleton.Avatar active={true} size={150} shape="square" className="bg-[var(--background-secondary)] rounded-2xl" />
                    <Skeleton.Avatar active={true} size={150} shape="square" className="bg-[var(--background-secondary)] rounded-2xl" />
                    <Skeleton.Avatar active={true} size={150} shape="square" className="bg-[var(--background-secondary)] rounded-2xl" />
                    <Skeleton.Avatar active={true} size={150} shape="square" className="bg-[var(--background-secondary)] rounded-2xl" />
                    <Skeleton.Avatar active={true} size={150} shape="square" className="bg-[var(--background-secondary)] rounded-2xl" />
                    <Skeleton.Avatar active={true} size={150} shape="square" className="bg-[var(--background-secondary)] rounded-2xl" />
                    <Skeleton.Avatar active={true} size={150} shape="square" className="bg-[var(--background-secondary)] rounded-2xl" />
                    <Skeleton.Avatar active={true} size={150} shape="square" className="bg-[var(--background-secondary)] rounded-2xl" />
                    <Skeleton.Avatar active={true} size={150} shape="square" className="bg-[var(--background-secondary)] rounded-2xl" />
                    <Skeleton.Avatar active={true} size={150} shape="square" className="bg-[var(--background-secondary)] rounded-2xl" />
                    <Skeleton.Avatar active={true} size={150} shape="square" className="bg-[var(--background-secondary)] rounded-2xl" />
                </div>

            </div>
        </>
    )
}