/*
  Warnings:

  - The values [MID] on the enum `Priority` will be removed. If these variants are still used in the database, this will fail.
  - The values [PROGRESS] on the enum `Status` will be removed. If these variants are still used in the database, this will fail.
  - The `assignee` column on the `Task` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Priority_new" AS ENUM ('NONE', 'URGENT', 'HIGH', 'MEDIUM', 'LOW');
ALTER TABLE "Task" ALTER COLUMN "priority" TYPE "Priority_new" USING ("priority"::text::"Priority_new");
ALTER TYPE "Priority" RENAME TO "Priority_old";
ALTER TYPE "Priority_new" RENAME TO "Priority";
DROP TYPE "Priority_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "Status_new" AS ENUM ('BACKLOG', 'TODO', 'INPROGRESS', 'COMPLETED');
ALTER TABLE "Task" ALTER COLUMN "status" TYPE "Status_new" USING ("status"::text::"Status_new");
ALTER TYPE "Status" RENAME TO "Status_old";
ALTER TYPE "Status_new" RENAME TO "Status";
DROP TYPE "Status_old";
COMMIT;

-- AlterTable
ALTER TABLE "Task" ALTER COLUMN "status" DROP NOT NULL,
DROP COLUMN "assignee",
ADD COLUMN     "assignee" JSONB,
ALTER COLUMN "priority" DROP NOT NULL,
ALTER COLUMN "project" DROP NOT NULL;
