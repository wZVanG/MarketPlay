"use client";

import { Product, ProductStatus } from "@/app/products/products.interface";
import { PRODUCT_STATUS_VARIANTS, STATUS_LABELS } from "@/lib/constants";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { LucideTrash, LucideEdit } from "lucide-react";
import { deleteProduct } from "@/app/products/products.api";
import { revalidate } from "@/lib/actions";
import Link from "next/link";
import { MouseEvent } from "react";


/*const PRODUCT_STATUS_VARIANTS = {
  NUEVO: "success",
  REACONDICIONADO: "default",
  USADO: "secondary",
  DEFECTUOSO: "destructive",
  NO_FUNCIONAL: "destructive",
} as const;

const STATUS_LABELS = {
  NUEVO: "Nuevo",
  REACONDICIONADO: "Re-acondicionado",
  USADO: "Usado",
  DEFECTUOSO: "Defectuoso",
  NO_FUNCIONAL: "No funcional"
} as const;*/

const getStatusVariant = (status: ProductStatus) => PRODUCT_STATUS_VARIANTS[status] || "default";
const getStatusLabel = (status: ProductStatus) => STATUS_LABELS[status] || "Unknown";

export function ProductCard({ product }: { product: Product }) {
  const handleDelete = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    try {
      await deleteProduct(product.id);
      await revalidate("/products");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card className="overflow-hidden shadow-lg border border-gray-200 rounded-lg transition-transform transform hover:scale-105 hover:shadow-xl">
      <div className="relative h-40 w-full bg-gray-100">
        <img
          src={product.photo ? product.photo : "https://placehold.co/400"}
          alt={product.title}
          className="h-full w-full object-cover"
        />
        <Badge
          variant={getStatusVariant(product.status)}
          className="absolute bottom-2 left-2 bg-opacity-90"
        >
          {getStatusLabel(product.status)}
        </Badge>
      </div>
      <CardContent className="p-4">
        <CardHeader className="flex justify-between items-start mb-2 p-0 p-b-4 p-t-4">
          <CardTitle className="text-xl font-bold truncate text-left">{product.title}</CardTitle>
        </CardHeader>
        <CardDescription className="text-sm text-gray-600 mb-4">
          {product.description || "Sin descripción."}
        </CardDescription>
      </CardContent>
      <CardFooter className="flex justify-between items-center border-t border-gray-200 p-4">
        <Button
          onClick={handleDelete}
          size="sm"
          variant="ghost"
          className="flex items-center gap-2"
        >
          <LucideTrash className="w-4 h-4" /> Eliminar
        </Button>
        <Button
          asChild
          size="sm"
          variant="default"
          className="flex items-center gap-2"
        >
          <Link href={`/products/${product.id}/edit`}>
            <LucideEdit className="w-4 h-4" /> Editar
          </Link>
        </Button>

      </CardFooter>
    </Card>
  );
}
