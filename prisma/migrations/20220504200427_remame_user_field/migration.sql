/*
  Warnings:

  - You are about to drop the column `cidade` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "cidade",
ADD COLUMN     "city" VARCHAR(255);
