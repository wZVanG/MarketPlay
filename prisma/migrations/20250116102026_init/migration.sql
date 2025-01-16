/*
  Warnings:

  - Changed the type of `status` on the `product` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "product" ALTER COLUMN "photo" DROP NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" INTEGER NOT NULL;

-- DropEnum
DROP TYPE "Status";
