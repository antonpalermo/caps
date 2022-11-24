-- AlterTable
ALTER TABLE "courses" ADD COLUMN     "userId" TEXT,
ALTER COLUMN "name" SET DEFAULT 'Untitled',
ALTER COLUMN "description" SET DEFAULT 'Blank untitled template';

-- AddForeignKey
ALTER TABLE "courses" ADD CONSTRAINT "courses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
