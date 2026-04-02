import { HttpMethod, METHOD_TEXT_COLORS } from '@/types/constant.type';
import { Permission } from '@/types/object.type';
import { PaginationProps, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';


interface Props {
    data: Permission[];
    loading: boolean;
    pagination: PaginationProps;
}

export default function PermissionTable({ data, loading, pagination }: Props) {
    const columns: ColumnsType<Permission> = [
        {
            title: "Tên",
            dataIndex: "name",
        },
        {
            title: "Method",
            dataIndex: "method",
            width: 120,
            render: (method: HttpMethod) => (
                <div
                    className={`${METHOD_TEXT_COLORS[method] || 'text-gray-500'} font-bold px-2 py-0.5 rounded-md border-current`}
                >
                    {method}
                </div>
            ),
        },
        {
            title: "Path",
            dataIndex: "path",
        },
        {
            title: "Mô tả",
            dataIndex: "description",
            render: (description: string) => (
                description ? (
                    description
                ) : (
                    <div>
                        Không có
                    </div>
                )
            ),
            responsive: ['md'],
        },
        // {
        //     title: "Hành động",
        //     key: "actions",
        //     width: 150,
        //     render: (_, record) => (
        //         <Space>
        //             <Button size="small">Sửa</Button>
        //             <Button size="small" danger>Xóa</Button>
        //         </Space>
        //     ),
        // },
    ];

    return (
        <Table
            rowKey="_id"
            columns={columns}
            dataSource={data}
            loading={loading}
            pagination={pagination}
        />
    );
}