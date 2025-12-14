import { Product } from "@/types/object.type";
import { useRouter } from "next/navigation";

interface ProductCardProps {
    product: Product;
    onAddToCart: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
    const router = useRouter();

    const handleGoDetail = () => {
        const encodedName = encodeURIComponent(product.name);
        const encodedImg = encodeURIComponent(product.img);
        router.push(`/product/${product._id}?name=${encodedName}&img=${encodedImg}&price=${product.price}&stock=${product.stock}`);
    };

    return (
        <div className="relative group p-4 rounded-xl shadow hover:shadow-lg transition cursor-pointer bg-[var(--background-secondary)]"
            onClick={handleGoDetail}>
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

        </div>
    );
}