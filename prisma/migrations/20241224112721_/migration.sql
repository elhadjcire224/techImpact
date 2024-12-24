/*
  Warnings:

  - You are about to drop the `_IdeaToTag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tags` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_IdeaToTag" DROP CONSTRAINT "_IdeaToTag_A_fkey";

-- DropForeignKey
ALTER TABLE "_IdeaToTag" DROP CONSTRAINT "_IdeaToTag_B_fkey";

-- DropTable
DROP TABLE "_IdeaToTag";

-- DropTable
DROP TABLE "tags";

-- CreateTable
CREATE TABLE "idea_tags" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,

    CONSTRAINT "idea_tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "idea_to_tags" (
    "ideaId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,

    CONSTRAINT "idea_to_tags_pkey" PRIMARY KEY ("ideaId","tagId")
);

-- CreateIndex
CREATE UNIQUE INDEX "idea_tags_label_key" ON "idea_tags"("label");

-- AddForeignKey
ALTER TABLE "idea_to_tags" ADD CONSTRAINT "idea_to_tags_ideaId_fkey" FOREIGN KEY ("ideaId") REFERENCES "ideas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "idea_to_tags" ADD CONSTRAINT "idea_to_tags_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "idea_tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;
