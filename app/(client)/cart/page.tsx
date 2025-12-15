"use client";
import { useToast } from "@/libs/toast";
import { useRemoveFromCart, useUserCart } from "@/queries/useCartQuery";
import { Product } from "@/types/object.type";
import { DeleteOutlined } from "@ant-design/icons";
import { Button, Checkbox, Empty, InputNumber, Tooltip } from "antd";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";


export default function Cart() {
    const router = useRouter();
    const { data, isPending } = useUserCart();
    const cart = data?.data?.data;
    const allProducts: Product[] = cart?.products ?? [];
    const toast = useToast();

    // State lưu trữ các productId được chọn
    const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);
    
    // Mutation xóa sản phẩm
    const { mutate: removeFromCart, isPending: removing } = useRemoveFromCart();

    // Tính tổng tiền của các sản phẩm ĐÃ CHỌN
    const selectedProducts = useMemo(() => {
        return allProducts.filter(item => selectedProductIds.includes(item.productId));
    }, [allProducts, selectedProductIds]);

    const totalSelectedPrice = useMemo(() => {
        return selectedProducts.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }, [selectedProducts]);


    // Hàm xử lý khi check/uncheck
    const handleCheck = (productId: string, checked: boolean) => {
        setSelectedProductIds(prev => {
            if (checked) {
                return [...prev, productId];
            } else {
                return prev.filter(id => id !== productId);
            }
        });
    };

    // Hàm xử lý xóa sản phẩm
    const handleRemove = (productId: string) => {
        removeFromCart(productId, {
            onSuccess: (res: any) => {
                toast.success(res?.data?.message || "Xóa sản phẩm thành công");
                // Cập nhật lại state selectedProductIds sau khi xóa
                setSelectedProductIds(prev => prev.filter(id => id !== productId));
            },
            onError: (err: any) => {
                toast.error(
                    err?.response?.data?.message || "Xóa sản phẩm thất bại"
                );
            },
        });
    };
    
    // Hàm xử lý chuyển sang trang thanh toán
    const handleCheckout = () => {
        if (selectedProducts.length === 0) {
            toast.warning("Vui lòng chọn ít nhất một sản phẩm để thanh toán.");
            return;
        }

        // Tạo dữ liệu để truyền qua trang thanh toán (dùng Query Params hoặc Local Storage)
        
        // Phương án 1: Dùng Local Storage (Tốt hơn cho dữ liệu lớn)
        const checkoutData = {
            products: selectedProducts.map(p => ({
                productId: p.productId,
                quantity: p.quantity,
                price: p.price,
                name: p.name,
                img: p.img,
            })),
            cartId: cart?._id, // Truyền cartId nếu cần
            totalPrice: totalSelectedPrice,
        };
        
        localStorage.setItem('checkoutData', JSON.stringify(checkoutData));
    
        router.push('/payment');
    };


    if (isPending) return null;

    return (
        <>
            <div className="p-6">
                <h3 className="uppercase text-3xl font-extrabold text-white mb-5 hover:text-green transition">
                    Giỏ hàng ({allProducts.length})
                </h3>

                <div className="bg-[var(--background-tertiary)] p-6 rounded-xl shadow-lg">
                    {allProducts.length === 0 ? (
                         <Empty 
                            description={<span className="text-gray-400">Giỏ hàng của bạn đang trống</span>} 
                            image={Empty.PRESENTED_IMAGE_SIMPLE}
                        />
                    ) : (
                        <table className="w-full text-left border-collapse text-base">
                            <thead>
                                <tr className="text-text-primary border-b border-[#2a2a2a]">
                                    <th className="py-3"></th> {/* Cột Checkbox */}
                                    <th className="py-3">Sản phẩm</th>
                                    <th className="py-3">Số lượng</th>
                                    <th className="py-3">Giá</th>
                                    <th className="py-3">Hành động</th>
                                </tr>
                            </thead>

                            <tbody>
                                {allProducts.map((item, index) => (
                                    <tr
                                        key={index}
                                        className="text-text-primary border-b border-[#2a2a2a] hover:bg-[#1a1a1a] transition"
                                    >
                                        <td className="py-4">
                                            <Checkbox 
                                                checked={selectedProductIds.includes(item.productId)}
                                                onChange={(e) => handleCheck(item.productId, e.target.checked)}
                                                className="scale-110"
                                            />
                                        </td>
                                        
                                        {/* ... Phần hiển thị sản phẩm giữ nguyên ... */}
                                        <td className="py-4 flex items-center gap-4">
                                            {
                                                item.img ? (
                                                    <img
                                                        className="w-[55px] h-[55px] object-cover rounded-lg"
                                                        src={item.img}
                                                        alt={item.name}
                                                    />
                                                ) : (
                                                    <img
                                                        className="w-[55px] h-[55px] object-cover rounded-lg"
                                                        src="https://product.hstatic.net/1000152881/product/0__2__7983795bc66e400eb81bf5c8462e9a78.jpg"
                                                        alt="No image"
                                                    />
                                                )
                                            }

                                            <p className="font-medium text-text-primary">
                                                {item.name}
                                            </p>
                                        </td>

                                        <td className="py-4">
                                            {/* Note: Không có logic update quantity ở đây, nên giữ InputNumber là readonly hoặc thêm logic update */}
                                            <div className="flex items-center gap-2 bg-[#1c1c1c] px-2 py-1 rounded-lg w-fit">
                                                <InputNumber
                                                    min={1}
                                                    max={999}
                                                    value={item.quantity}
                                                    readOnly // Tạm thời để readOnly nếu không có hook update quantity
                                                    className="w-12 text-center text-white !bg-[#1c1c1c] !border-none"
                                                />
                                            </div>
                                        </td>

                                        <td className="py-4 font-semibold text-green">
                                            {(item.price * item.quantity).toLocaleString()} đ
                                        </td>

                                        <td className="py-4">
                                            <Tooltip title="Xóa khỏi giỏ hàng">
                                                <DeleteOutlined 
                                                    onClick={() => handleRemove(item.productId)} 
                                                    className={`bg-red-500 p-1.5 rounded-sm cursor-pointer ${removing ? 'opacity-50' : ''}`}
                                                />
                                            </Tooltip>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                    
                    {/* Footer */}
                    {allProducts.length > 0 && (
                        <div className="mt-6 flex justify-between items-center bg-[#1c1c1c] p-4 rounded-lg">
                            <div className="text-xl font-semibold text-text-primary">
                                Tổng tiền ({selectedProducts.length} sản phẩm):{" "}
                                <span className="text-green">
                                    {totalSelectedPrice.toLocaleString()} đ
                                </span>
                            </div>

                            <Button
                                type="primary"
                                className="!bg-green !px-8 !py-5 !text-lg hover:!bg-green-600"
                                onClick={handleCheckout} // Gọi hàm chuyển trang
                                disabled={selectedProducts.length === 0}
                            >
                                Mua hàng ({selectedProducts.length})
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}