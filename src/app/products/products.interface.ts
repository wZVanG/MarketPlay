export enum ProductStatus {
  NUEVO = 1,
  REACONDICIONADO = 2,
  USADO = 3,
  DEFECTUOSO = 4,
  NO_FUNCIONAL = 5
}

export interface Product {
  id: string;
  title: string;
  description?: string;
  status: ProductStatus;
  photo: string;
}

export type ProductForm = Omit<Product, "id">;

export interface ProductsPageContentProps {
  products: { id: string; title: string; description: string; photo: string; status: number }[];
  status?: number;
  isLoading: boolean;
}