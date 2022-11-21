-- CreateEnum
CREATE TYPE "Role" AS ENUM ('student', 'professor', 'admin');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "role" "Role";
