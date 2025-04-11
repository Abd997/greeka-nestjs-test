-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('PENDING', 'DONE', 'IN_PROGRESS', 'PAUSED');

-- CreateEnum
CREATE TYPE "TaskPriority" AS ENUM ('HIGH', 'MEDIUM', 'NORMAL');

-- CreateTable
CREATE TABLE "tasks" (
    "uid" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "date_due" TIMESTAMPTZ(3) NOT NULL,
    "date_created" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_active" BOOLEAN NOT NULL,
    "status" "TaskStatus" NOT NULL,
    "priority" "TaskPriority" NOT NULL,

    CONSTRAINT "tasks_pkey" PRIMARY KEY ("uid")
);
