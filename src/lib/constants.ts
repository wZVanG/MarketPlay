import { ProductStatus } from "@/app/products/products.interface";

export const PRODUCT_STATUS_VARIANTS = {
    [ProductStatus.NUEVO]: "success",
    [ProductStatus.REACONDICIONADO]: "default",
    [ProductStatus.USADO]: "secondary",
    [ProductStatus.DEFECTUOSO]: "destructive",
    [ProductStatus.NO_FUNCIONAL]: "destructive",
} as const;

export const STATUS_LABELS = {
    [ProductStatus.NUEVO]: "Nuevo",
    [ProductStatus.REACONDICIONADO]: "Re-acondicionado",
    [ProductStatus.USADO]: "Usado",
    [ProductStatus.DEFECTUOSO]: "Defectuoso",
    [ProductStatus.NO_FUNCIONAL]: "No funcional"
} as const;
