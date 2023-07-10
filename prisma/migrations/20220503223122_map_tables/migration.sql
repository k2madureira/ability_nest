/*
  Warnings:

  - You are about to drop the `Instrument` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Method` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserMethod` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Method" DROP CONSTRAINT "Method_instrumentId_fkey";

-- DropForeignKey
ALTER TABLE "UserMethod" DROP CONSTRAINT "UserMethod_methodId_fkey";

-- DropForeignKey
ALTER TABLE "UserMethod" DROP CONSTRAINT "UserMethod_userId_fkey";

-- DropTable
DROP TABLE "Instrument";

-- DropTable
DROP TABLE "Method";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "UserMethod";

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "fistName" VARCHAR(255) NOT NULL,
    "secondName" VARCHAR(255),
    "email" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "urlImage" VARCHAR(255),
    "tel" TEXT,
    "role" "Role" NOT NULL DEFAULT E'STUDENT',
    "state" VARCHAR(255),
    "cidade" VARCHAR(255),
    "district" VARCHAR(255),
    "zipCode" VARCHAR(255),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_to_method" (
    "id" TEXT NOT NULL,
    "userId" VARCHAR(255) NOT NULL,
    "methodId" VARCHAR(255) NOT NULL,
    "lesson" VARCHAR(255),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "user_to_method_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "methods" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "urlImage" VARCHAR(255),
    "instrumentId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "methods_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "instruments" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "family" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "instruments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "user_to_method" ADD CONSTRAINT "user_to_method_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_to_method" ADD CONSTRAINT "user_to_method_methodId_fkey" FOREIGN KEY ("methodId") REFERENCES "methods"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "methods" ADD CONSTRAINT "methods_instrumentId_fkey" FOREIGN KEY ("instrumentId") REFERENCES "instruments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
