/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `instruments` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `methods` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `instruments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `methods` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "instruments" ADD COLUMN     "slug" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "methods" ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "instruments_slug_key" ON "instruments"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "methods_slug_key" ON "methods"("slug");
