/*
  Warnings:

  - A unique constraint covering the columns `[jobType,variable]` on the table `JobPricing` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "JobPricing_jobType_variable_key" ON "public"."JobPricing"("jobType", "variable");
