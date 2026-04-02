import { useMarkRead } from "@/queries/useNofiticationQuery";
import { NOTIFICATION_CONFIG } from "@/types/constant.type";
import { Notification } from "@/types/object.type";
import { BellOutlined } from "@ant-design/icons";
import { Typography } from "antd";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

interface NotificationItemProps {
    notification: Notification;
}

export default function NotificationItem({ notification } : NotificationItemProps){
    const { _id, type, title, message, isRead, createdAt } = notification;
    const markReadMutation = useMarkRead();
    
    const config = NOTIFICATION_CONFIG[type as keyof typeof NOTIFICATION_CONFIG] || { 
        icon: BellOutlined, 
        color: 'text-gray-400' 
    };
    const IconComponent = config.icon;

    const handleMarkRead = () => {
        if (!isRead && !markReadMutation.isPending) {
            markReadMutation.mutate(_id);
        }
    };

    return (
        <div
            className={`flex items-start p-3 cursor-pointer transition 
                ${isRead ? 'bg-[#181818] hover:bg-[#282828]' : 'bg-[#282828] hover:bg-[#383838]'}
                relative border-b border-[#303030]`}
            onClick={handleMarkRead}
        >
            {!isRead && (
                <div className="absolute top-2 right-2 w-2 h-2 bg-green-500 rounded-full"></div>
            )}
            
            {/* Icon */}
            <div className={`p-2 rounded-full ${config.color} mr-3 text-xl`}>
                <IconComponent />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
                <Typography.Text 
                    className={`font-bold block ${isRead ? 'text-gray-400' : 'text-white'}`}
                    style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                >
                    {title}
                </Typography.Text>
                <Typography.Text 
                    className={`text-sm block ${isRead ? 'text-gray-500' : 'text-gray-300'}`}
                >
                    {message}
                </Typography.Text>
                <Typography.Text className="text-xs text-gray-500 mt-1 block">
                    {dayjs(createdAt).fromNow()}
                </Typography.Text>
            </div>
        </div>
    );
};

