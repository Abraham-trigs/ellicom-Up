-- DropIndex
DROP INDEX "public"."JobPricing_jobType_variable_key";

-- AlterTable
ALTER TABLE "public"."JobPricing" ADD COLUMN     "colorOptions" TEXT[],
ADD COLUMN     "sideOptions" TEXT[];
