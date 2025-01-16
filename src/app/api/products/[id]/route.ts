/* eslint-disable @typescript-eslint/no-explicit-any */

import prisma from "@/lib/db";
import { productSchema } from "@/lib/schemas/product.schema";
import { NextRequest, NextResponse } from "next/server";
//import { deleteFromS3 } from "@/lib/s3";

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(_: any, { params }: Params) {
  try {
    const { id } = await params;

    const product = await prisma.product.findFirst({
      where: {
        id,
      },
    });

    return NextResponse.json({ product });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;

    const body = await request.json();

    const { title, description, photo, status } = productSchema.parse(body);

    await prisma.product.update({
      data: {
        title,
        description,
        photo,
        status,
      },
      where: {
        id,
      },
    });

    return NextResponse.json({ message: "Producto actualizado con éxito" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(_: NextRequest, { params }: Params) {
  try {
    const { id } = await params;

    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (product?.photo) {
      // Eliminar la imagen de S3
      //await deleteFromS3(product.photo);
    }

    await prisma.product.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({ message: "Producto eliminado con éxito" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
