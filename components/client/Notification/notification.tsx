import { useNotificationList } from "@/queries/useNofiticationQuery";
import { PaginationParam } from "@/types/param.type";
import { BellFilled } from "@ant-design/icons";
import { Dropdown, Pagination, Spin, Typography } from "antd";
import { useState } from "react";
import NotificationItem from "./notification-item";

export default function NotificationDropdown() {
    const [params, setParams] = useState<PaginationParam>({
        page: 1,
        size: 5,
    });

    const { data: notificationRes, isPending } = useNotificationList(params);

    const notifications = notificationRes?.data ?? [];
    const total = notificationRes?.meta?.totalElements || 0;
    const hasUnread = notifications.some(n => !n.isRead);
    const pageSize = params.size ?? 5;

    const notificationContent = (
        <div className="w-[350px] bg-[#121212] rounded-lg shadow-xl border border-[#303030]">
            {/* Header */}
            <div className="flex justify-between items-center p-3 border-b border-[#303030]">
                <Typography.Title level={4} className="!text-white !m-0">
                    Thông báo
                </Typography.Title>
            </div>

            {/* List */}
            <div className="min-h-[200px] relative">
                {isPending ? (
                    <div className="flex justify-center items-center py-10">
                        <Spin size="large" />
                    </div>
                ) : notifications.length > 0 ? (
                    notifications.map(n => (
                        <NotificationItem key={n._id} notification={n} />
                    ))
                ) : (
                    <div className="p-4 text-center text-gray-400">
                        Không có thông báo mới.
                    </div>
                )}
            </div>

            {total > pageSize && (
                <div className="p-3 border-t border-[#303030] flex justify-center">
                    <Pagination
                        simple
                        current={params.page}
                        pageSize={params.size}
                        total={total}
                        onChange={page =>
                            setParams(prev => ({ ...prev, page }))
                        }
                        disabled={isPending}
                    />
                </div>
            )}
        </div>
    );

    return (
        <Dropdown
            trigger={['click']}
            placement="bottomRight"
            dropdownRender={() => notificationContent}
        >
            <div className="relative cursor-pointer">
                <BellFilled className="text-green text-2xl" />
                {hasUnread && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
                )}
            </div>
        </Dropdown>
    );
}