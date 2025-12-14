import Title from "@/components/ui/title";
import { useToast } from "@/libs/toast";
import { useCommentList, useCreateComment, useDeleteComment, useUpdateComment } from "@/queries/useCommentQuery";
import { useAuthStore } from "@/stores/useAuthStore";
import { Button, Pagination, Popconfirm } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";

interface Prop {
    songId: string
}

export default function SongComment({ songId }: Prop) {
    const toast = useToast();
    const user = useAuthStore((state) => state.user);


    const [page, setPage] = useState(1);
    const { data, refetch } = useCommentList(songId, {
        page
    });


    const { mutate: createComment, isPending } = useCreateComment();
    const { mutate: updateComment } = useUpdateComment();
    const { mutate: deleteComment } = useDeleteComment();

    const [content, setContent] = useState("");
    const [editingComment, setEditingComment] = useState<any>(null);
    const [replyingTo, setReplyingTo] = useState<any>(null);

    const handleSubmit = () => {
        if (!content.trim()) {
            toast.error("Vui lòng nhập nội dung bình luận");
            return;
        }

        // ===== UPDATE =====
        if (editingComment) {
            updateComment(
                {
                    id: editingComment._id,
                    data: {
                        content,
                    },
                },
                {
                    onSuccess: (res: any) => {
                        toast.success(res?.data?.message || "Cập nhật bình luận thành công");
                        setContent("");
                        setEditingComment(null);
                    },
                    onError: (err: any) => {
                        toast.error(err?.response?.data?.message || "Cập nhật thất bại");
                    },
                }
            );
            return;
        }

        createComment(
            { songId, content },
            {
                onSuccess: (res: any) => {
                    toast.success(res?.data?.message || "Bình luận thành công");
                    setContent("");
                    refetch();
                },
                onError: (err: any) => {
                    toast.error(err?.response?.data?.message || "Gửi bình luận thất bại");
                },
            }
        );
    };

    const handleDelete = (id: string) => {
        deleteComment(id, {
            onSuccess: () => {
                toast.success("Xóa bình luận thành công");
                refetch();
            },
            onError: (err: any) => {
                toast.error(err?.response?.data?.message || "Gửi bình luận thất bại");
            },
        });
    };

    return (
        <>
            <div className="my-10"></div>
            <Title>Bình luận</Title>

            {/* INPUT */}
            <TextArea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                size="large"
                placeholder="Nhập bình luận của bạn"
                allowClear
            />

            <div className="text-right mt-2">
                <Button
                    type="primary"
                    className="bg-green"
                    loading={isPending}
                    onClick={handleSubmit}
                >
                    {editingComment ? "Cập nhật" : "Gửi"}
                </Button>
            </div>

            {/* LIST COMMENT */}
            <div>
                {data?.data.map((c: any) => {
                    const isOwner = c.userId?.username === user?.username;

                    return (
                        <div key={c._id} className="flex gap-5 items-start my-8">
                            {/* Avatar */}
                            {c.userId?.avatar ? (
                                <img
                                    className="w-[50px] h-[50px] object-cover rounded-full"
                                    src={c.userId.avatar}
                                    alt={c.userId.username}
                                />
                            ) : (
                                <div className="w-[50px] h-[50px] rounded-full bg-green flex items-center justify-center text-white font-bold text-lg">
                                    {c.userId?.username?.charAt(0).toUpperCase()}
                                </div>
                            )}

                            {/* Content */}
                            <div className="flex-1">
                                <div className="flex gap-3 items-center mb-2">
                                    <div className="text-xl font-bold text-green">
                                        {c.userId?.username}
                                    </div>

                                    <div className="text-text-secondary text-base">
                                        {new Date(c.createdAt).toLocaleString("vi-VN")}
                                    </div>

                                    {/* ACTIONS */}

                                </div>

                                <div className="text-text-primary text-base mb-5">
                                    {c.content}
                                </div>
                                <div className="ml-auto flex gap-2">
                                    {/* <Button
                                        size="small"
                                        onClick={() => setReplyingTo(c)}
                                    >
                                        Trả lời
                                    </Button> */}
                                    {isOwner && (
                                        <>
                                            <Button
                                                size="small"
                                                onClick={() => {
                                                    setContent(c.content);
                                                    setEditingComment(c);
                                                }}
                                            >
                                                Sửa
                                            </Button>

                                            <Popconfirm
                                                title="Xóa bình luận?"
                                                okText="Xóa"
                                                cancelText="Hủy"

                                                onConfirm={() => handleDelete(c._id)}
                                            >
                                                <Button size="small">
                                                    Xóa
                                                </Button>
                                            </Popconfirm>
                                        </>
                                    )}
                                </div>
                            </div>
                            {/* {replyingTo?._id === c._id && (
                                <div className="mt-3">
                                    <TextArea
                                        rows={2}
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                        placeholder={`Trả lời ${c.userId.username}...`}
                                    />
                                    <div className="text-right mt-2">
                                        <Button
                                            size="small"
                                            type="primary"
                                            onClick={handleSubmit}
                                        >
                                            Gửi
                                        </Button>
                                    </div>
                                </div>
                            )} */}
                        </div>
                    );
                })}

            </div>

            <div className="flex justify-center">
                <Pagination
                    current={page}
                    pageSize={5}
                    total={data?.meta?.totalElements}
                    onChange={setPage}
                    className="text-center mt-6"
                />
            </div>

        </>
    );
}
