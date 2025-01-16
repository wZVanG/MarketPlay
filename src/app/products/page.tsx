
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { LucidePlusCircle } from "lucide-react";
import { ProductFilter } from "@/components/product-filter";
import { ProductCardSkeleton } from "@/components/product-card-skeleton";
import ProductsContent from "./products-content";
import Image from "next/image";
import Link from "next/link";

export default async function ProductsPage(props: {
  searchParams?: Promise<{
    status?: number;
  }>;
}) {
  const searchParams = await props.searchParams;
  const status = Number(searchParams?.status);

  return (
    <div className="max-w-screen-lg mx-auto p-8">
      <header className="flex justify-between items-center mb-5">
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


      <div className="mt-0 mb-8 ml-4 text-xs text-gray-500">
        <ul className="list-disc list-inside">
          <li>Ver código de fuente en cada página para ver el renderizado.</li>
          <li>Se usó PostgreSQL y el servicio Neon para la base de datos.</li>
          <li>Se usó S3 para el almacenamiento de imágenes.</li>
        </ul>
      </div>


      <div className="mb-4">
        <div className="relative rounded-sm overflow-x-scroll md:overflow-hidden h-10 bg-muted overflow-y-hidden scrollbar-hide">
          <ProductFilter />
        </div>
      </div>

      <div className="max-w-screen-lg mx-auto p-8 border border-gray-300 rounded-lg shadow-lg min-h-full">

        <Suspense key={status} fallback={
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {Array.from({ length: 4 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </div>
        }>
          <ProductsContent status={status} />
        </Suspense>
      </div>

    </div>
  );
}
