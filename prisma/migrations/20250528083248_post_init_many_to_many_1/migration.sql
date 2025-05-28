/*
  Warnings:

  - You are about to drop the `GropuPost` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserOnGroupPosts" DROP CONSTRAINT "UserOnGroupPosts_groupPostId_fkey";

-- DropTable
DROP TABLE "GropuPost";

-- CreateTable
CREATE TABLE "GroupPost" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "GroupPost_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserOnGroupPosts" ADD CONSTRAINT "UserOnGroupPosts_groupPostId_fkey" FOREIGN KEY ("groupPostId") REFERENCES "GroupPost"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
