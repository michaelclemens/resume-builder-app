-- CreateEnum
CREATE TYPE "Template" AS ENUM ('DEFAULT', 'COMPACT');

-- AlterTable
ALTER TABLE "Resume" ADD COLUMN     "template" "Template" NOT NULL DEFAULT 'DEFAULT';
