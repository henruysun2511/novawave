

// components/admin/Report/ReportTable.tsx

import { useToast } from "@/libs/toast";
import { useUpdateReport } from "@/queries/useReportQuery"; // Hook cập nhật Report
import { ReportStatus } from "@/types/constant.type";
import { Report } from "@/types/object.type";
import { Button, Popconfirm, Space, Table, Tag, Tooltip } from "antd";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";






interface Props {
    data: Report[];
    loading?: boolean;
    pagination?: any;
}


export function ReportTable({ data, loading, pagination }: Props) {
    const toast = useToast();
    const { mutate: updateStatus, isPending: isUpdating } = useUpdateReport();


    const handleUpdateStatus = (id: string, newStatus: ReportStatus) => {
        const payload = {
            status: newStatus,
        };

        updateStatus(
            { id, data: payload },
            {
                onSuccess: (res) => {
                    toast.success(res?.data?.message || `Cập nhật trạng thái thành công!`);
                },
                onError: (error: any) => {
                    const msg =
                        error?.response?.data?.message ||
                        error?.message ||
                        "Cập nhật trạng thái thất bại";
                    toast.error(Array.isArray(msg) ? msg.join(", ") : msg);
                },
            }
        );
    };

    const columns: ColumnsType<Report> = [
        {
            title: "ID Report",
            dataIndex: "_id",
            width: 150,
            render: (id: string) => <Tooltip title={id}>{id.slice(0, 8)}...</Tooltip>
        },
        {
            title: "Loại Target",
            dataIndex: "targetType",
            width: 100,
            render: (type: string) => <Tag color="blue">{type.toUpperCase()}</Tag>
        },
        {
            title: "ID Target",
            dataIndex: "targetId",
            width: 150,
            render: (id: string) => <Tooltip title={id}>{id.slice(0, 8)}...</Tooltip>
        },
        {
            title: "Lý do",
            dataIndex: "reason",
        },
        {
            title: "Mô tả",
            dataIndex: "description",
            render: (desc: string) => desc || <i>Không có</i>
        },
        {
            title: "Ngày tạo",
            dataIndex: "createdAt",
            width: 120,
            render: (date: string) => dayjs(date).format('DD/MM/YYYY')
        },
       {
            title: "Trạng thái",
            dataIndex: "status",
            width: 120,
        },
        {
            title: "Hành động",
            width: 250,
            render: (r: Report) => (
                <Space>
                    <Button
                        type="primary"
                        disabled={r.status !== ReportStatus.PENDING || isUpdating}
                        onClick={() => handleUpdateStatus(r._id, ReportStatus.RESOLVED)}
                        loading={isUpdating}
                    >
                        Đã xử lý
                    </Button>

                    {/* ✨ Dùng Popconfirm thay cho Modal để xử lý "Từ chối" trực tiếp */}
                    <Popconfirm
                        title="Xác nhận Từ chối Report"
                        description="Bạn có chắc muốn từ chối Report này không? Thao tác này không thể hoàn tác."
                        onConfirm={() => handleUpdateStatus(r._id, ReportStatus.REJECTED)}
                        okText="Từ chối"
                        cancelText="Hủy"
                        okButtonProps={{ danger: true, loading: isUpdating }}
                    >
                        <Button
                            danger
                            disabled={r.status !== ReportStatus.PENDING || isUpdating}
                            loading={isUpdating}
                        >
                            Từ chối
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <Table
            rowKey="_id"
            columns={columns}
            dataSource={data}
            loading={loading}
            pagination={pagination}
        />
        // ✨ Loại bỏ ReportRejectModal
    );
}