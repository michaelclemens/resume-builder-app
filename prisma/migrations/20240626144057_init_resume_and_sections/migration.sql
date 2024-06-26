-- CreateEnum
CREATE TYPE "SectionType" AS ENUM ('Personal', 'Experience', 'Education');

-- CreateTable
CREATE TABLE "Resume" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Resume_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Section" (
    "id" TEXT NOT NULL,
    "resumeId" TEXT NOT NULL,
    "type" "SectionType" NOT NULL,
    "data" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Section_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Section" ADD CONSTRAINT "Section_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "Resume"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
