import { useNewsDetail } from "@/queries/useNewsQuery";
import { Avatar, Descriptions, Image, Modal, Skeleton, Space, Tag } from "antd";
import dayjs from "dayjs";

interface Props {
    open: boolean;
    onCancel: () => void;
    newsId: string | null; // Truyền ID thay vì object News
}

export function NewsDetailModal({ open, onCancel, newsId }: Props) {
    // Gọi hook lấy chi tiết tin tức
    const { data: newsResponse, isLoading } = useNewsDetail(newsId as string);
    const data = newsResponse?.data;

    return (
        <Modal
            title="Chi tiết tin tức"
            open={open}
            onCancel={onCancel}
            footer={null}
            width={900}
            destroyOnClose // Quan trọng: Để reset data khi đóng/mở với ID khác
        >
            {isLoading ? (
                <Skeleton active paragraph={{ rows: 8 }} />
            ) : data ? (
                <Descriptions bordered column={1}>
                    <Descriptions.Item label="Tiêu đề">
                        <b style={{ fontSize: '16px' }}>{data.title}</b>
                    </Descriptions.Item>

                    <Descriptions.Item label="Người đăng">
                        <Space>
                            <Avatar src={data.createdBy?.avatar} size="small" />
                            <span>{data.createdBy?.username || "Admin"}</span>
                        </Space>
                    </Descriptions.Item>

                    <Descriptions.Item label="Ngày tạo">
                        {dayjs(data.createdAt).format('DD/MM/YYYY HH:mm')}
                    </Descriptions.Item>

                    <Descriptions.Item label="Trạng thái">
                        <Tag color={data.status === 'PUBLISHED' ? 'green' : 'gold'}>
                            {data.status === 'PUBLISHED' ? 'Đã xuất bản' : 'Bản nháp'}
                        </Tag>
                    </Descriptions.Item>

                    <Descriptions.Item label="Ảnh bìa">
                        <Image
                            src={data.imageUrl}
                            width={200}
                            alt="news"
                            fallback="https://placehold.co/600x400?text=No+Image"
                        />
                    </Descriptions.Item>

                    <Descriptions.Item label="Nội dung">
                        <div
                            className="news-content-preview"
                            style={{
                                maxHeight: '400px',
                                overflowY: 'auto',
                                padding: '10px',
                                border: '1px solid #f0f0f0',
                                borderRadius: '4px'
                            }}
                            dangerouslySetInnerHTML={{ __html: data.content }}
                        />
                    </Descriptions.Item>
                </Descriptions>
            ) : (
                <div className="text-center py-10">Không tìm thấy thông tin tin tức</div>
            )}
        </Modal>
    );
}