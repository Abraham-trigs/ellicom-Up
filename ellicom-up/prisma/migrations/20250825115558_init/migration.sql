/*
  Warnings:

  - The values [GUEST] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."Role_new" AS ENUM ('SUPERADMIN', 'ADMIN', 'SECRETARY', 'STAFF', 'CLIENT');
ALTER TABLE "public"."User" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "public"."User" ALTER COLUMN "role" TYPE "public"."Role_new" USING ("role"::text::"public"."Role_new");
ALTER TYPE "public"."Role" RENAME TO "Role_old";
ALTER TYPE "public"."Role_new" RENAME TO "Role";
DROP TYPE "public"."Role_old";
COMMIT;

-- DropIndex
DROP INDEX "public"."JobPricing_jobType_materialType_variable_key";

-- DropIndex
DROP INDEX "public"."User_phone_key";

-- DropIndex
DROP INDEX "public"."User_role_idx";

-- AlterTable
ALTER TABLE "public"."Job" ADD COLUMN     "clientId" TEXT;

-- AlterTable
ALTER TABLE "public"."User" ALTER COLUMN "password" DROP NOT NULL,
ALTER COLUMN "phone" DROP NOT NULL,
ALTER COLUMN "role" DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "public"."Job" ADD CONSTRAINT "Job_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
