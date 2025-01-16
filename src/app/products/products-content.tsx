import { getProducts } from "./products.api";
import { ProductCard } from "@/components/product-card";

interface ProductsContentProps {
    status?: number;
}

export default async function ProductsContent({
    status,
}: ProductsContentProps) {

    const { products } = await getProducts({ status });

    return (
        <div >

            {products.length > 0
                ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {
                            products.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))
                        }
                    </div>
                )
                : (
                    <div className="flex justify-center items-center h-full text-center text-sm text-gray-500">
                        No hay productos disponibles en el estado seleccionado.
                    </div>
                )
            }
        </div>

    );
}
