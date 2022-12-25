/*
  Warnings:

  - Made the column `header` on table `docs` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "docs" ALTER COLUMN "header" SET NOT NULL,
ALTER COLUMN "header" DROP DEFAULT;
