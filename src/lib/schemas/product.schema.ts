import { z } from 'zod';
import { ProductStatus } from "@/app/products/products.interface";

export const productSchema = z.object({
    title: z.string().min(1, "El título es requerido"),
    description: z.string().optional(),
    photo: z.string().min(1, "La foto es requerida"),
    status: z.preprocess((value) => Number(value), z.nativeEnum(ProductStatus)),
});