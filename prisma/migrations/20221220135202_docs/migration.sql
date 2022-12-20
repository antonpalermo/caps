-- CreateTable
CREATE TABLE "docs" (
    "id" TEXT NOT NULL,
    "header" TEXT DEFAULT 'Untitled Document',
    "body" JSONB,
    "courseId" TEXT,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateUpdated" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "docs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "docs_id_key" ON "docs"("id");

-- AddForeignKey
ALTER TABLE "docs" ADD CONSTRAINT "docs_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE SET NULL ON UPDATE CASCADE;
