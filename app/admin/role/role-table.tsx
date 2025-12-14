import { EditOutlined, SecurityScanOutlined } from '@ant-design/icons';
import { Button, Space, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';

interface Role { 
    _id: string;
    name: string;
    description?: string;
}

interface Props {
    data: Role[];
    loading: boolean;
    onEdit: (role: Role) => void;
    onAssignPermissions: (role: Role) => void;
}

export default function RoleTable({ data, loading, onEdit, onAssignPermissions }: Props) {
    const columns: ColumnsType<Role> = [
        {
            title: "Tên Role",
            dataIndex: "name",
        },
        {
            title: "Mô tả",
            dataIndex: "description",
            render: (desc: string) => desc || "Chưa có mô tả",
        },
        // Thêm cột số lượng quyền hạn sau khi bạn triển khai gán quyền
        // {
        //     title: "Số lượng Quyền hạn",
        //     render: (_, record) => record.permissionsCount || 0,
        // },
        {
            title: "Hành động",
            key: "actions",
            width: 250,
            render: (_, record) => (
                <Space>
                    {/* Nút Sửa */}
                    <Button 
                        icon={<EditOutlined />} 
                        onClick={() => onEdit(record)}
                    >
                        Sửa
                    </Button>
                    
                    {/* Nút Gán Quyền */}
                    <Button 
                        icon={<SecurityScanOutlined />} 
                        type="primary"
                        onClick={() => onAssignPermissions(record)}
                        className='bg-green'
                    >
                        Gán Quyền
                    </Button>
                    
                    {/* Thêm nút Xóa (Popconfirm) nếu cần */}
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
            pagination={false}
        />
    );
}