-- DropForeignKey
ALTER TABLE "methods" DROP CONSTRAINT "methods_instrumentId_fkey";

-- DropForeignKey
ALTER TABLE "user_to_method" DROP CONSTRAINT "user_to_method_methodId_fkey";

-- DropForeignKey
ALTER TABLE "user_to_method" DROP CONSTRAINT "user_to_method_userId_fkey";

-- AlterTable
ALTER TABLE "methods" ALTER COLUMN "instrumentId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "user_to_method" ADD CONSTRAINT "user_to_method_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_to_method" ADD CONSTRAINT "user_to_method_methodId_fkey" FOREIGN KEY ("methodId") REFERENCES "methods"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "methods" ADD CONSTRAINT "methods_instrumentId_fkey" FOREIGN KEY ("instrumentId") REFERENCES "instruments"("id") ON DELETE SET NULL ON UPDATE CASCADE;
