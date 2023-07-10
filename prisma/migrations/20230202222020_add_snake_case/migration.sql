/*
  Warnings:

  - You are about to drop the column `firstName` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `secondName` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `urlImage` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `zipCode` on the `users` table. All the data in the column will be lost.
  - Added the required column `first_name` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "firstName",
DROP COLUMN "secondName",
DROP COLUMN "urlImage",
DROP COLUMN "zipCode",
ADD COLUMN     "first_name" VARCHAR(255) NOT NULL,
ADD COLUMN     "second_name" VARCHAR(255),
ADD COLUMN     "url_image" VARCHAR(255),
ADD COLUMN     "zip_code" VARCHAR(255);
