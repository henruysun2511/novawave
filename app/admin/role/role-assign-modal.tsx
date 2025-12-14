import { useToast } from '@/libs/toast';
import { usePermissionList } from '@/queries/usePermissionQuery';
import { useAssignPermissions } from '@/queries/useRoleQuery';
import { HttpMethod, METHOD_TEXT_COLORS } from '@/types/constant.type';
import { Permission, Role } from '@/types/object.type';
import { Button, Collapse, Modal, Space, Switch, Typography } from 'antd';
import { useEffect, useState } from 'react';

const { Title, Text } = Typography;
const { Panel } = Collapse;

const groupPermissionsByModule = (permissions: Permission[]) => {
    return permissions.reduce((acc, permission) => {
        // Giả định module là từ khóa đầu tiên trong Name (ví dụ: 'Delete User' -> 'User')
        // Hoặc Module là phần đầu tiên của Path (ví dụ: '/api/v1/users/id' -> 'Users')
        
        // Dựa trên hình ảnh, ta có thể giả định Module là chữ cái đầu tiên viết hoa
        const module = permission.name.split(' ')[0].toUpperCase(); 

        if (!acc[module]) {
            acc[module] = [];
        }
        acc[module].push(permission);
        return acc;
    }, {} as Record<string, Permission[]>);
};

interface Props {
    open: boolean;
    onCancel: () => void;
    role: Role | null;
}

export default function RoleAssignModal({ open, onCancel, role }: Props) {
    const toast = useToast();
    
    // Lấy danh sách tất cả Permissions
    const { data: allPermissionsData, isPending: isPermissionsLoading } = usePermissionList({
        size: 100
    });
    const groupedPermissions = groupPermissionsByModule(allPermissionsData?.data || []);
    
    // Hook gán quyền
    const { mutate: assignPermissions, isPending: isAssigning } = useAssignPermissions();

    // State lưu trữ các ID quyền hạn đã chọn (tương ứng với Role hiện tại)
    const [selectedPermissionIds, setSelectedPermissionIds] = useState<string[]>([]);

    // 1. Khởi tạo/Cập nhật State khi Role thay đổi
    useEffect(() => {
        if (role) {
            setSelectedPermissionIds(role.permissions || []);
        } else {
            setSelectedPermissionIds([]);
        }
    }, [role]);

    // 2. Xử lý bật/tắt quyền cá nhân
    const handleTogglePermission = (permissionId: string, checked: boolean) => {
        setSelectedPermissionIds(prev => 
            checked 
                ? [...prev, permissionId] 
                : prev.filter(id => id !== permissionId)
        );
    };

    // 3. Xử lý bật/tắt Switch Header (Cả Module)
    const handleToggleModule = (moduleKey: string, checked: boolean) => {
        const modulePermissions = groupedPermissions[moduleKey];
        const modulePermissionIds = modulePermissions.map(p => p._id);
        
        setSelectedPermissionIds(prev => {
            let newIds = prev.filter(id => !modulePermissionIds.includes(id));
            if (checked) {
                // Thêm tất cả ID của module này vào danh sách
                newIds = [...newIds, ...modulePermissionIds];
            }
            // Loại bỏ các ID trùng lặp nếu có
            return Array.from(new Set(newIds)); 
        });
    };

    // 4. Xử lý Lưu
    const handleSave = () => {
        if (!role?._id) return;

        assignPermissions({ 
            roleId: role._id, 
            permissionIds: selectedPermissionIds 
        }, {
            onSuccess: (res: any) => {
                toast.success(res?.message || `Gán quyền cho Role ${role.name} thành công.`);
                onCancel();
            },
            onError: (error: any) => {
                const msg = error?.response?.data?.message || 'Gán quyền thất bại';
                toast.error(Array.isArray(msg) ? msg.join(', ') : msg);
            },
        });
    };

    if (isPermissionsLoading) {
        return <Modal title={`Gán Quyền cho Role: ${role?.name}`} open={open} footer={null}>Đang tải danh sách quyền...</Modal>;
    }

    // --- RENDER HEADER (CUSTOM SWITCH) ---
    const renderHeader = (moduleKey: string) => {
        const modulePermissions = groupedPermissions[moduleKey];
        const modulePermissionIds = modulePermissions.map(p => p._id);
        
        // Kiểm tra xem tất cả các quyền trong module này có được chọn không
        const isAllSelected = modulePermissionIds.every(id => selectedPermissionIds.includes(id));

        return (
            <div className="flex justify-between items-center w-full pr-4" onClick={(e) => e.stopPropagation()}>
                <Text strong>{moduleKey}</Text>
                <Switch 
                    checked={isAllSelected} 
                    onChange={(checked) => handleToggleModule(moduleKey, checked)}
                />
            </div>
        );
    };

    return (
        <Modal
            title={<Title level={4}>Gán quyền cho Role: <Text type="success" className='text-green'>{role?.name}</Text></Title>}
            open={open}
            onCancel={onCancel}
            width={700}
            footer={[
                <Button key="back" onClick={onCancel}>
                    Hủy
                </Button>,
                <Button 
                    key="submit" 
                    type="primary" 
                    loading={isAssigning} 
                    onClick={handleSave}
                >
                    Lưu Gán Quyền
                </Button>,
            ]}
        >
            <Collapse 
                bordered={false} 
                defaultActiveKey={Object.keys(groupedPermissions)} // Mở tất cả các Panel mặc định
            >
                {Object.entries(groupedPermissions).map(([moduleKey, permissions]) => (
                    <Panel 
                        key={moduleKey} 
                        header={renderHeader(moduleKey)} // Header có Switch
                        // Loại bỏ padding mặc định của header để Switch hoạt động
                        className="p-0"
                    >
                        {/* Body hiển thị danh sách quyền chi tiết */}
                        <div className="bg-gray-50 p-4 border rounded-b-lg">
                            {permissions.map((p: Permission) => (
                                <div key={p._id} className="flex justify-between items-center py-2 border-b last:border-b-0">
                                    <Space direction="horizontal">
                                        <div
                                            className={`${METHOD_TEXT_COLORS[p.method as HttpMethod] || 'bg-gray-500'} font-bold px-2 py-0.5 rounded-md`}
                                        >
                                            {p.method}
                                        </div>
                                        <Text>{p.name} - <Text type="secondary" code>{p.path}</Text></Text>
                                    </Space>
                                    <Switch
                                        checked={selectedPermissionIds.includes(p._id)}
                                        onChange={(checked) => handleTogglePermission(p._id, checked)}
                                    />
                                </div>
                            ))}
                        </div>
                    </Panel>
                ))}
            </Collapse>
        </Modal>
    );
}