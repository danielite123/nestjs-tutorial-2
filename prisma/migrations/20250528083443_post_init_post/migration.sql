/*
  Warnings:

  - You are about to drop the `GroupPost` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserOnGroupPosts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserOnGroupPosts" DROP CONSTRAINT "UserOnGroupPosts_groupPostId_fkey";

-- DropForeignKey
ALTER TABLE "UserOnGroupPosts" DROP CONSTRAINT "UserOnGroupPosts_userId_fkey";

-- DropTable
DROP TABLE "GroupPost";

-- DropTable
DROP TABLE "UserOnGroupPosts";
