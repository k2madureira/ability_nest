/*
  Warnings:

  - You are about to drop the column `reply` on the `observations` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "observations" DROP COLUMN "reply",
ADD COLUMN     "replyFromId" TEXT;

-- AddForeignKey
ALTER TABLE "observations" ADD CONSTRAINT "observations_replyFromId_fkey" FOREIGN KEY ("replyFromId") REFERENCES "observations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
