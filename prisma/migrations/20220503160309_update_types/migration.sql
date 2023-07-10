/*
  Warnings:

  - You are about to alter the column `title` on the `Method` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `urlImage` on the `Method` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `fistName` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `secondName` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `urlImage` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `state` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `cidade` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `district` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `zipCode` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `userId` on the `UserMethod` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `methodId` on the `UserMethod` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `lesson` on the `UserMethod` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.

*/
-- DropForeignKey
ALTER TABLE "UserMethod" DROP CONSTRAINT "UserMethod_methodId_fkey";

-- DropForeignKey
ALTER TABLE "UserMethod" DROP CONSTRAINT "UserMethod_userId_fkey";

-- AlterTable
ALTER TABLE "Method" ALTER COLUMN "title" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "urlImage" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "fistName" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "secondName" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "urlImage" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "state" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "cidade" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "district" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "zipCode" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "UserMethod" ALTER COLUMN "userId" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "methodId" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "lesson" SET DATA TYPE VARCHAR(255);

-- AddForeignKey
ALTER TABLE "UserMethod" ADD CONSTRAINT "UserMethod_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserMethod" ADD CONSTRAINT "UserMethod_methodId_fkey" FOREIGN KEY ("methodId") REFERENCES "Method"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
