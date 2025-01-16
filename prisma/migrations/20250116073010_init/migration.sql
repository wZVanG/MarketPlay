-- CreateEnum
CREATE TYPE "Status" AS ENUM ('NUEVO', 'REACONDICIONADO', 'USADO', 'DEFECTUOSO', 'NO_FUNCIONAL');

-- CreateTable
CREATE TABLE "product" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "photo" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'NUEVO',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "product_pkey" PRIMARY KEY ("id")
);
