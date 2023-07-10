-- AlterTable
ALTER TABLE "users" ADD COLUMN     "instrumentId" TEXT;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_instrumentId_fkey" FOREIGN KEY ("instrumentId") REFERENCES "instruments"("id") ON DELETE SET NULL ON UPDATE CASCADE;
