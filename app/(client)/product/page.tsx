"use client";
import Footer from "@/components/client/footer/footer";
import ProductCard from "@/components/client/Product/product-card";
import { useProductList } from "@/queries/useProductQuery";
import { Product } from "@/types/object.type";
import { Input, Pagination } from "antd";
import { useState } from "react";
const { Search } = Input;


export default function ProductPage() {
    const [params, setParams] = useState({
        page: 1,
        size: 10,
        name: "",
        start: 0,
        end: 1000000000
    });

    const { data, isPending } = useProductList(params);
    const products = data?.data ?? [];
    const meta = data?.meta;

    const handleAddToCart = (product: Product) => {
        console.log("Add to cart:", product);
    };

    return (
        <>
            <div className="relative w-full h-[450px]">
                <img
                    src="https://i.pinimg.com/1200x/ea/70/ec/ea70ec7e95451cc072affd66366d06d8.jpg"
                    className="w-full h-full object-cover rounded-2xl"
                />
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="absolute bottom-0 left-0 z-20 p-4 w-full">
                    <div className="text-base text-white mb-1">
                        Sắm ngay tai nghe hiện đại nhất 2025
                    </div>
                    <h3 className="uppercase text-7xl font-extrabold text-white mb-1 hover:text-green transition">
                        MUSIC PRODUCT
                    </h3>
                </div>
            </div>

            <div className="p-6 ">
                <div className="flex gap-5">
                    <Search
                        className="custom-search"
                        size="large"
                        placeholder="Tìm kiếm tên sản phẩm"
                        allowClear
                        style={{ width: 550 }}
                        onSearch={(value) =>
                            setParams((prev) => ({ ...prev, name: value, page: 1 }))
                        }
                    />

                    <div className="flex gap-3">
                        <div className="flex gap-2 items-center">
                            <p className="text-text-primary text-base">Giá từ: </p>
                            <Input className="w-[150px]" onChange={(e) =>
                                setParams((prev) => ({
                                    ...prev,
                                    start: Number(e.target.value),
                                    page: 1,
                                }))
                            } />
                        </div>

                        <div className="flex gap-2 items-center">
                            <p className="text-text-primary text-base">đến </p>
                            <Input className="w-[150px]" onChange={(e) =>
                                setParams((prev) => ({
                                    ...prev,
                                    end: Number(e.target.value),
                                    page: 1,
                                }))
                            }/>
                        </div>
                    </div>
                </div>



                {isPending ? (
                    <div className="mt-5">Đang tải...</div>
                ) : (
                    <>
                        {/* Danh sách sản phẩm */}
                        <div className="grid grid-cols-4 gap-5 mt-6">
                            {products.map((p: Product) => (
                                <ProductCard
                                    key={p._id}
                                    product={p}
                                    onAddToCart={handleAddToCart}
                                />
                            ))}
                        </div>

                        {/* Phân trang */}
                        <div className="mt-6 flex justify-center">
                            <Pagination
                                current={meta?.page ?? 1}
                                pageSize={meta?.size ?? 10}
                                total={meta?.totalElements ?? 0}
                                onChange={(page, size) =>
                                    setParams((prev) => ({
                                        ...prev,
                                        page,
                                        size,
                                    }))
                                }
                            />
                        </div>
                    </>
                )}
            </div>

            <Footer />
        </>
    );
}
