import { ProductForm } from "@/components/product-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Product } from "@/app/products/products.interface";
import { getProduct } from "../products.api";

interface Params {
  params: Promise<{
    id: string;
  }>;
}

export default async function NewProduct({ params }: Params) {
  const id = (await params)?.id;

  let data: { product: Product } | undefined;

  if (id) {
    data = await getProduct(id);
  }

  console.log(data);

  return (
    <div className="max-w-3xl w-full p-8 mx-auto ">
      <Card className="border border-gray-300 bg-white rounded-lg shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-gray-800">Nuevo Producto</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <ProductForm product={data?.product} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
