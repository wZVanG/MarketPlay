/* eslint-disable @typescript-eslint/no-explicit-any */
import { ProductStatus } from "@/app/products/products.interface";
import prisma from "@/lib/db";
import { productSchema } from "@/lib/schemas/product.schema";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function GET(request: NextRequest) {
  try {

    const status = Number(request.nextUrl.searchParams.get("status"));

    const products = await prisma.product.findMany(
      {
        where: {
          status: status || undefined,
        },
        orderBy: {
          updatedAt: "desc",
        },
      }
    );

    return NextResponse.json({ products });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { title, description, photo, status } = productSchema.parse(body);

    await prisma.product.create({
      data: {
        title,
        description,
        photo,
        status,
      },
    });

    return NextResponse.json({ message: "Producto creado con éxito" });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }

    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
