/*
  Warnings:

  - You are about to drop the column `emailVerified` on the `users` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "user_skills" DROP CONSTRAINT "user_skills_userId_fkey";

-- DropIndex
DROP INDEX "users_email_key";

-- AlterTable
ALTER TABLE "ideas" ALTER COLUMN "status" DROP DEFAULT;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "emailVerified";

-- CreateTable
CREATE TABLE "idea_tags" (
    "ideaId" TEXT NOT NULL,
    "tag" TEXT NOT NULL,

    CONSTRAINT "idea_tags_pkey" PRIMARY KEY ("ideaId","tag")
);

-- AddForeignKey
ALTER TABLE "user_skills" ADD CONSTRAINT "user_skills_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
