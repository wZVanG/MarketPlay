import { Button } from "@/components/ui/button";
import { LucidePlusCircle } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import Link from "next/link";
import { Product, ProductsPageContentProps } from "./products.interface";
import Image from "next/image";

export function ProductsPageContent({
    products,
    status,
    isLoading,
}: ProductsPageContentProps) {
    return (
        <div className="max-w-screen-lg mx-auto p-8">
            <header className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">
                    <Image src="/play.png" alt="Logo de PLAY Group LATAM" width={20} height={20} className="inline-block mr-4" />
                    Inventario PLAY Group LATAM</h1>

                <Button asChild>
                    <Link href="/products/add">
                        <span className="hidden md:inline-block">
                            Agregar producto
                        </span>
                        <LucidePlusCircle />
                    </Link>
                </Button>
            </header>
            <div className="max-w-screen-lg mx-auto p-8 border border-gray-300 rounded-lg shadow-lg min-h-full">

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {isLoading
                        ? Array.from({ length: 8 }).map((_, index) => (
                            <div
                                key={index}
                                className="animate-pulse bg-gray-200 h-48 rounded-lg"
                            ></div>
                        ))
                        : products.length > 0
                            ? products.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))
                            : "No hay productos"}
                </div>
            </div>

        </div>
    );
}
