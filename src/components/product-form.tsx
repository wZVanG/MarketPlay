"use client";

import { Product, ProductStatus } from "@/app/products/products.interface";
import { PRODUCT_STATUS_VARIANTS, STATUS_LABELS } from "@/lib/constants";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";

import { createProduct, updateProduct } from "@/app/products/products.api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";


interface Inputs {
  title: string;
  photo: string;
  status: ProductStatus;
  description: string;
}

export const ProductForm = ({ product }: { product?: Product }) => {
  const router = useRouter();

  const { toast } = useToast();
  const { register, handleSubmit, setValue, getValues } = useForm<Inputs>({
    defaultValues: {
      title: product?.title,
      photo: product?.photo,
      status: product?.status,
      description: product?.description,
    },
  });

  const [uploading, setUploading] = useState(false);
  const [photoUrl, setPhotoUrl] = useState(product?.photo || "");
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisTimeout, setAnalysisTimeout] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (analyzing) {
      timeoutId = setTimeout(() => {
        setAnalysisTimeout(true);
        setAnalyzing(false);

      }, 5000);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [analyzing, toast]);

  const analyzeImage = async (imageUrl: string) => {
    setAnalyzing(true);
    setAnalysisTimeout(false);
    try {

      const response = await fetch("/api/analyze-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ imageUrl }),
      });

      if (!response.ok) {
        throw new Error('Failed to analyze image');
      }

      const result = await response.json();

      if (result) {

        if ('title' in result && 'description' in result) {
          setValue("title", result.title);
          setValue("description", result.description);
        }

      }


    } catch (error) {
      console.log("Error analyzing image:", error);

    } finally {
      setAnalyzing(false);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);


    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.fileUrl) {

        setPhotoUrl(data.fileUrl);
        setValue("photo", data.fileUrl);

        //Analizar solo si el titulo y la descripción del formulario están vacíos, no de data

        if (!getValues("title") && !getValues("description")) {
          await analyzeImage(data.fileUrl);
        }

      }
    } catch (error) {
      console.error("Error uploading file:", error);
      toast({
        title: "Error",
        description: "Error al subir la imagen",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleChange = (value: string) => {
    const valor = Number(value);
    setValue("status", valor as ProductStatus);
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let response: any;

      if (product?.id) {
        response = await updateProduct(product.id, {
          photo: data.photo,
          description: data.description,
          title: data.title,
          status: data.status,
        });
      } else {
        response = await createProduct({
          photo: data.photo,
          description: data.description,
          title: data.title,
          status: data.status,
        });
      }

      toast({
        title: "Correcto",
        description: response.message,
      });

      router.push("/products");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">

      <div>
        <Label className="block mb-2" htmlFor="photo">
          Sube la foto del producto:
        </Label>
        <div className="flex flex-col gap-2">
          {photoUrl && (
            <img
              src={photoUrl}
              alt="Preview"
              className="w-32 h-32 object-cover rounded-lg"
            />
          )}
          <Input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            disabled={uploading}
            id="photo"
          />
          <input
            type="hidden"

            {...register("photo")}
            value={photoUrl}
          />
        </div>
      </div>



      <div>
        <Label className="block mb-2" htmlFor="title">
          Título
        </Label>
        <Input
          {...register("title", { required: true })}
          id="title"
          className={`${analyzing ? 'animate-pulse bg-gray-100' : ''}`}
          disabled={analyzing}
        />
      </div>

      <div>
        <Label className="block mb-2" htmlFor="description">
          Descripción
        </Label>
        <Textarea
          {...register("description")}
          id="description"
          className={`${analyzing ? 'animate-pulse bg-gray-100' : ''}`}
          disabled={analyzing}
        />
      </div>



      <div className="mb-8">
        <Label className="block mb-2" htmlFor="assigned">
          Condición
        </Label>
        <Select defaultValue={product?.status?.toString()} onValueChange={handleChange}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(STATUS_LABELS).map(([value, label]) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

      </div>

      <div className="flex justify-between gap-4">

        <Button asChild variant="secondary">
          <Link href={"/products"}>Regresar</Link>
        </Button>
        <Button type="submit">
          {product?.id ? "Guardar" : "Crear"}
        </Button>

      </div>
    </form>
  );
};
