/*
  Warnings:

  - The values [PENDING] on the enum `JobStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `clientId` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Job` table. All the data in the column will be lost.
  - Added the required column `jobType` to the `Job` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."JobStatus_new" AS ENUM ('DRAFT', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED');
ALTER TABLE "public"."Job" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "public"."Job" ALTER COLUMN "status" TYPE "public"."JobStatus_new" USING ("status"::text::"public"."JobStatus_new");
ALTER TYPE "public"."JobStatus" RENAME TO "JobStatus_old";
ALTER TYPE "public"."JobStatus_new" RENAME TO "JobStatus";
DROP TYPE "public"."JobStatus_old";
ALTER TABLE "public"."Job" ALTER COLUMN "status" SET DEFAULT 'DRAFT';
COMMIT;

-- DropForeignKey
ALTER TABLE "public"."Job" DROP CONSTRAINT "Job_clientId_fkey";

-- AlterTable
ALTER TABLE "public"."Job" DROP COLUMN "clientId",
DROP COLUMN "title",
DROP COLUMN "type",
ADD COLUMN     "jobPricingId" TEXT,
ADD COLUMN     "jobType" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Job" ADD CONSTRAINT "Job_jobPricingId_fkey" FOREIGN KEY ("jobPricingId") REFERENCES "public"."JobPricing"("id") ON DELETE SET NULL ON UPDATE CASCADE;
