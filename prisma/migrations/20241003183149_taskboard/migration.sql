-- CreateEnum
CREATE TYPE "Status" AS ENUM ('BACKLOG', 'TODO', 'PROGRESS', 'COMPLETED');

-- CreateEnum
CREATE TYPE "Priority" AS ENUM ('NONE', 'URGENT', 'LOW', 'MID', 'HIGH');

-- CreateEnum
CREATE TYPE "Project" AS ENUM ('FRONTEND', 'CLOUD', 'PERFORMANCE', 'BACKEND', 'QA');

-- CreateTable
CREATE TABLE "Task" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" "Status" NOT NULL,
    "assignee" TEXT NOT NULL,
    "priority" "Priority" NOT NULL,
    "tags" TEXT[],
    "project" "Project" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);
