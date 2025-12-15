"use client"
import Title from '@/components/ui/title';
import { useToast } from '@/libs/toast';
import { useAddToCart } from '@/queries/useCartQuery';
import { CreditCardOutlined, MinusOutlined, PlusOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Button, Card, Col, Image, InputNumber, Row, Space, Typography } from 'antd';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
const { Text } = Typography;

export default function ProductDetailPage() {
    const toast = useToast();
    const router = useRouter(); // Khai báo useRouter

    // 1. Lấy và chuyển đổi dữ liệu từ URL
    const params = useParams();
    const id = params.id as string; // ID sản phẩm
    const searchParams = useSearchParams();
    const name = searchParams.get('name');
    const img = searchParams.get('img');
    const priceString = searchParams.get('price');
    const stockString = searchParams.get('stock'); 

    const price = priceString ? parseFloat(priceString) : 0;
    const stock = stockString ? parseInt(stockString) : 0;


    const [quantity, setQuantity] = useState<number>(1); 

    const addToCartMutation = useAddToCart();

    const handleAddToCart = () => {
        // ... (Logic thêm vào giỏ hàng giữ nguyên) ...
        if (quantity > stock) {
            toast.error('Số lượng mua vượt quá số lượng tồn kho');
            return;
        }

        addToCartMutation.mutate({
            productId: id,
            quantity: quantity,
        }, {
            onSuccess: (res) => {
                toast.success(res.data.message || `Đã thêm ${quantity} x "${name}" vào giỏ hàng!`);
            },
            onError: (error: any) => {
                const errorMessage = error.response?.data?.message || "Không thể thêm vào giỏ hàng.";
                toast.error(`Thất bại: ${errorMessage}`);
            }
        });
    };

    const handleBuyNow = () => {
        if (stock <= 0) {
            toast.error('Sản phẩm đã hết hàng.');
            return;
        }
        if (quantity > stock) {
            toast.error('Số lượng mua vượt quá số lượng tồn kho');
            return;
        }

        const checkoutData = {
            products: [{
                productId: id,
                quantity: quantity,
                price: price,
                name: name,
                img: img,
            }],
            totalPrice: price * quantity, 
        };
        
        localStorage.setItem('checkoutData', JSON.stringify(checkoutData));
        toast.info(`Đang chuẩn bị thanh toán cho ${quantity} x "${name}"...`);

        router.push('/payment');
    };
    
    const handleQuantityChange = (value: number | null) => {
        if (value === null) return;
        setQuantity(value);
    };

    const decreaseQuantity = () => {
        setQuantity(prev => Math.max(1, prev - 1));
    };

    const increaseQuantity = () => {
        setQuantity(prev => Math.min(stock, prev + 1));
    };

    if (!id || !name) {
        return <div className="p-8 text-white">Đang tải chi tiết sản phẩm...</div>;
    }

    return (
        <div className="min-h-screen px-4 py-10 md:px-10">
            <Card className="mx-auto max-w-6xl bg-[var(--background-secondary)] border-none rounded-2xl shadow-2xl">
                <Row gutter={[48, 48]} align="middle">
                      <Col xs={24} md={10} lg={9} className="flex justify-center">

                        {img && (
                            <Image
                                src={img}
                                alt={name || 'Sản phẩm'}
                                className="rounded-2xl object-cover shadow-lg"
                                preview
                            />
                        )}

                    </Col>

                    <Col xs={24} md={14} lg={15}>
                        <Title>{name}</Title>

                        <div className="mt-4 mb-6">
                            <div className="text-green font-bold text-xl">
                                {Number(price).toLocaleString('vi-VN')} VNĐ
                            </div>
                            <Text className="text-gray-500 text-sm">
                                Đã bao gồm VAT (nếu có)
                            </Text>
                        </div>

                        <div className="mb-8">
                            <div className="flex items-center gap-3 mb-3">
                                <Text className="text-white">Tồn kho:</Text>
                                <span
                                    className="text-text-primary"
                                >
                                    {stock.toLocaleString()}
                                </span>
                            </div>

                            <Text className="text-white block mb-2">Số lượng</Text>

                            <div className="flex items-center gap-3 bg-[#222] rounded-xl px-3 py-2 w-fit">
                                <Button
                                    icon={<MinusOutlined />}
                                    className="!border-none !text-white bg-[#222] hover:!bg-[#333]"
                                    onClick={decreaseQuantity} 
                                    disabled={quantity <= 1}
                                />
                                <InputNumber
                                    min={1}
                                    max={stock}
                                    value={quantity} 
                                    onChange={handleQuantityChange} 
                                    className="w-14 text-center text-white"
                                    controls={false}
                                />
                                <Button
                                    icon={<PlusOutlined />}
                                    className="!border-none !text-white bg-[#222] hover:!bg-[#333]"
                                    onClick={increaseQuantity} 
                                    disabled={quantity >= stock || stock <= 0} 
                                />
                            </div>
                        </div>
                        <Space size="large">
                            <Button
                                type="primary"
                                size="large"
                                icon={<CreditCardOutlined />}
                                onClick={handleBuyNow} // Sử dụng hàm đã cập nhật
                                disabled={stock <= 0}
                                className="bg-green hover:bg-green-700 border-none px-8 h-12 text-base font-semibold rounded-xl shadow-lg"
                            >
                                Mua ngay
                            </Button>

                            <Button
                                size="large"
                                type='primary'
                                icon={<ShoppingCartOutlined />}
                                onClick={handleAddToCart} 
                                disabled={stock <= 0 || addToCartMutation.isPending} 
                                className="bg-[#2a2a2a] hover:bg-[#333] px-7 h-12 rounded-xl"
                            >
                                Thêm giỏ hàng
                            </Button>
                        </Space>
                    </Col>
                </Row>
            </Card>
        </div>
    );
}