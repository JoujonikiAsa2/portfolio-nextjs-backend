/*
  Warnings:

  - You are about to drop the column `techStacc` on the `Projects` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Projects" DROP COLUMN "techStacc",
ADD COLUMN     "techStack" TEXT[];
