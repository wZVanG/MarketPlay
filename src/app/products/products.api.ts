/* eslint-disable @typescript-eslint/no-explicit-any */
import { Product, ProductForm } from "./products.interface";

const URL = process.env.NEXT_PUBLIC_API_URL;

export const getProducts = async ({
  status,
}: {
  status?: number;
}): Promise<{
  products: Product[];
}> => {
  try {

    const url = `${URL}/products?${status ? `status=${status}` : ""}`;

    const response = await fetch(url);
    const data = await response.json();

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const createProduct = async (
  product: ProductForm
): Promise<{ message: string }> => {
  try {

    const response = await fetch(`${URL}/products`, {
      body: JSON.stringify(product),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) throw new Error(data.error);

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const deleteProduct = async (
  id: string
): Promise<{ message: string }> => {
  try {
    const response = await fetch(`${URL}/products/${id}`, {
      method: "DELETE",
    });

    const data = await response.json();

    if (!response.ok) throw new Error(data.error);

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getProduct = async (id: string): Promise<{ product: Product }> => {
  try {
    const response = await fetch(`${URL}/products/${id}`);

    const data = await response.json();

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const updateProduct = async (id: string, product: ProductForm) => {
  try {
    const response = await fetch(`${URL}/products/${id}`, {
      body: JSON.stringify(product),
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) throw new Error(data.error);

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
