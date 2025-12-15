"use client";
import Title from '@/components/ui/title';
import { useToast } from '@/libs/toast';
import { usePaymentProduct } from '@/queries/usePaymentQuery';
import { PaymentProductDto } from '@/types/body.type';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Card, Divider, Form, Input, List, Spin, Typography } from 'antd';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';


const { Text } = Typography;

interface CheckoutData {
    products: { productId: string; quantity: number; price: number; name: string; img?: string }[];
    cartId?: string;
    totalPrice: number;
}

export default function CheckoutPage() {
    const router = useRouter();
    const [form] = Form.useForm();
    const toast = useToast();

    // State lưu trữ dữ liệu sản phẩm từ giỏ hàng
    const [checkoutData, setCheckoutData] = useState<CheckoutData | null>(null);
    const { mutate: payProductMutate, isPending: isPaying } = usePaymentProduct();

    useEffect(() => {
        // Lấy dữ liệu từ Local Storage
        const storedData = localStorage.getItem('checkoutData');
        if (storedData) {
            setCheckoutData(JSON.parse(storedData));
        } else {
            toast.warning("Không tìm thấy sản phẩm trong giỏ hàng. Quay lại giỏ hàng.");
        }
    }, [toast]);

    // Tổng tiền đã được tính sẵn (hoặc tính lại từ products để an toàn hơn)
    const totalPrice = checkoutData?.totalPrice ?? 0;

    const handleBack = () => {
        // Xóa dữ liệu tạm thời khi quay lại
        localStorage.removeItem('checkoutData');
        router.back();
    };

    const normalizePhone = (phone: string) => {
        if (phone.startsWith('0')) {
            return '+84' + phone.slice(1);
        }
        if (phone.startsWith('84')) {
            return '+' + phone;
        }
        return phone;
    };

    const onFinish = (values: any) => {
        if (!checkoutData || checkoutData.products.length === 0) {
            toast.error("Không có sản phẩm để thanh toán.");
            return;
        }

        const productsPayload = checkoutData.products.map(p => ({
            productId: p.productId,
            quantity: p.quantity
        }));

        const phone = normalizePhone(values.phone);

        const payload: PaymentProductDto = {
            fullName: values.fullName,
            phone: phone,
            address: values.address,
            products: productsPayload, // Cast vì React Query cần đúng tuple type
            cartId: checkoutData.cartId,
        };


        payProductMutate(payload, {
            onSuccess: (res: any) => {
                const checkoutUrl = res.data?.data?.checkoutUrl;

                if (checkoutUrl) {
                    toast.success("Khởi tạo thanh toán thành công! Đang chuyển hướng...");
                    window.location.href = checkoutUrl;

                    localStorage.removeItem('checkoutData');
                } else {
                    toast.error("Khởi tạo thanh toán thất bại: Không tìm thấy URL.");
                }
            },
            onError: (error: any) => {
                const msg =
                    error?.response?.data?.message ||
                    "Có lỗi xảy ra khi khởi tạo thanh toán.";
                toast.error(Array.isArray(msg) ? msg.join(", ") : msg);
            },
        });
    };

    if (!checkoutData) {
        return (
            <div className="p-6 text-center text-white">
                <Spin size="large" />
                <p className="mt-4">Đang tải dữ liệu giỏ hàng...</p>
                <Button
                    type="link"
                    onClick={handleBack}
                    className="!text-green mt-2"
                >
                    <ArrowLeftOutlined /> Quay lại giỏ hàng
                </Button>
            </div>
        );
    }


    return (
        <div className="p-6 text-white min-h-screen">
            <Title>
                Thanh toán
            </Title>
            <div className='mb-8'></div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Cột 1: Thông tin khách hàng */}
                <div className="lg:col-span-2">
                    <Card className="!bg-[var(--background-tertiary)] !rounded-xl !border-none text-white">
                        <h4 className="text-xl font-semibold text-green mb-4">Thông tin nhận hàng</h4>
                        <Form
                            form={form}
                            layout="vertical"
                            onFinish={onFinish}
                            className="text-white"
                        >
                            <Form.Item
                                name="fullName"
                                label={<span className="text-white">Họ và Tên</span>}
                                rules={[{ required: true, message: 'Vui lòng nhập Họ và Tên!' }]}
                            >
                                <Input placeholder="Nguyễn Văn A" className="!bg-[#1c1c1c] !text-white !border-none" />
                            </Form.Item>

                            <Form.Item
                                name="phone"
                                label={<span className="text-white">Số điện thoại</span>}
                                rules={[
                                    { required: true, message: 'Vui lòng nhập Số điện thoại!' },
                                    {
                                        pattern: /^(0|\+84|84)(3|5|7|8|9)[0-9]{8}$/,
                                        message: 'Số điện thoại không hợp lệ (VD: 0901234567 hoặc +84901234567)',
                                    },
                                ]}
                            >
                                <Input
                                    placeholder="0901234567"
                                    className="!bg-[#1c1c1c] !text-white !border-none"
                                />
                            </Form.Item>

                            <Form.Item
                                name="address"
                                label={<span className="text-white">Địa chỉ nhận hàng</span>}
                                rules={[{ required: true, message: 'Vui lòng nhập Địa chỉ!' }]}
                            >
                                <Input.TextArea rows={3} placeholder="Số nhà, đường, quận/huyện, tỉnh/thành phố" className="!bg-[#1c1c1c] !text-white !border-none" />
                            </Form.Item>

                            <Divider className='!bg-[#2a2a2a]' />

                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={isPaying}
                                className="!bg-green !w-full !py-5 !text-lg !font-bold hover:!bg-green-600"
                            >
                                Thanh Toán
                            </Button>

                            <Button
                                type="link"
                                onClick={handleBack}
                                className="!text-gray-400 mt-2 !w-full"
                            >
                                <ArrowLeftOutlined /> Quay lại giỏ hàng
                            </Button>
                        </Form>
                    </Card>
                </div>

                {/* Cột 2: Danh sách sản phẩm */}
                <div className="lg:col-span-1">
                    <Card className="!bg-[var(--background-tertiary)] !rounded-xl !border-none text-white sticky top-4">
                        <h4 className="text-xl font-semibold text-green mb-4">Đơn hàng ({checkoutData.products.length} sản phẩm)</h4>
                        <List
                            itemLayout="horizontal"
                            dataSource={checkoutData.products}
                            renderItem={(item) => (
                                <List.Item className='!border-b-[#2a2a2a]'>
                                    <List.Item.Meta
                                        avatar={
                                            <img
                                                src={item.img || "https://product.hstatic.net/1000152881/product/0__2__7983795bc66e400eb81bf5c8462e9a78.jpg"}
                                                alt={item.name}
                                                className="w-12 h-12 object-cover rounded-md"
                                            />
                                        }
                                        title={<div className='text-l text-text-primary'>{item.name}</div>}
                                        description={<div className="!text-gray-400 text-sm">SL: {item.quantity}</div>}
                                    />
                                    <div>
                                        <div className="!text-green font-semibold">
                                            {(item.price * item.quantity).toLocaleString()} đ
                                        </div>
                                    </div>
                                </List.Item>
                            )}
                        />
                        <Divider className='!bg-[#2a2a2a]' />
                        <div className="flex justify-between font-bold text-lg">
                            <div className="!text-white">Tổng cộng:</div>
                            <div className="!text-green">{totalPrice.toLocaleString()} đ</div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}