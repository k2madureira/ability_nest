/*
  Warnings:

  - You are about to drop the `_MethodToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_MethodToUser" DROP CONSTRAINT "_MethodToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_MethodToUser" DROP CONSTRAINT "_MethodToUser_B_fkey";

-- DropTable
DROP TABLE "_MethodToUser";
