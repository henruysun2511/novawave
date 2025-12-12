import { Product } from "@/types/object.type";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";

interface ProductCardProps {
    product: Product;
    onAddToCart: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
    return (
        <div className="relative group p-4 rounded-xl shadow hover:shadow-lg transition cursor-pointer bg-[var(--background-secondary)]">
            <div className="w-full h-56 overflow-hidden rounded-lg">
                <img
                    src={product.img}
                    className="w-full h-full object-cover"
                />
            </div>

            <h3 className="font-semibold mt-3 text-lg line-clamp-1 text-text-primary mb-1.5">
                {product.name}
            </h3>

            <p className="font-bold text-green text-xl mb-1.5">
                {product.price.toLocaleString()}₫
            </p>

            <p className="font-bold text-gray-600 text-sm">
                Còn: {product.stock}
            </p>

            <div className="absolute inset-0  bg-black/40 rounded-xl opacity-0  group-hover:opacity-100 transition"></div>

            <Tooltip title="Thêm vào giỏ hàng">
                <div
                    className="absolute top-3 right-3 bg-green p-2 rounded-full shadow opacity-0 
                group-hover:opacity-100 transition"
                    onClick={() => onAddToCart(product)}
                >
                    <ShoppingCartOutlined size={20} />
                </div>
            </Tooltip>

        </div>
    );
}