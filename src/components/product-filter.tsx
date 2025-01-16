"use client";

import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ProductStatus } from "@/app/products/products.interface";
import { STATUS_LABELS } from "@/lib/constants";
import Link from "next/link";
import { cn } from "@/lib/utils";
//import { LucidePackageSearch } from "lucide-react";
//<LucidePackageSearch className="vertical-align-middle align-self-center" />

export function ProductFilter() {
  const searchParams = useSearchParams();
  const currentStatus = searchParams.get("status");

  return (
    <nav className="flex space-x-4 px-4 align-items-center">


      <Link
        href="/products"
        className={cn(
          "px-3 py-2 rounded-md text-sm font-medium",
          !currentStatus ? "bg-primary text-white" : "text-gray-600 hover:text-gray-900"
        )}
      >
        Todos
      </Link>
      {Object.values(ProductStatus)
        .filter(value => typeof value === 'number')
        .map((value) => (
          <Link
            key={value}
            href={`/products?status=${value}`}
            className={cn(
              "px-3 py-2 rounded-md text-sm font-medium",
              currentStatus === value.toString()
                ? "bg-primary text-white"
                : "text-gray-600 hover:text-gray-900"
            )}
          >
            {STATUS_LABELS[value as ProductStatus]}
          </Link>
        ))}
    </nav>
  );
}