/*
  Warnings:

  - Added the required column `description` to the `observations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "observations" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "reply" BOOLEAN NOT NULL DEFAULT false;
