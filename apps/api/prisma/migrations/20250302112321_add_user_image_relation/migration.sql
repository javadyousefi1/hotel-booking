/*
  Warnings:

  - You are about to drop the `Hotel` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Image" ALTER COLUMN "path" SET NOT NULL,
ALTER COLUMN "path" SET DATA TYPE TEXT;

-- DropTable
DROP TABLE "Hotel";
