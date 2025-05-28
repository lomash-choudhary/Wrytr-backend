/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `fullName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "avatar" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "bio" VARCHAR(400) NOT NULL DEFAULT '',
ADD COLUMN     "facebook" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "fullName" VARCHAR(255) NOT NULL,
ADD COLUMN     "github" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "google_auth" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isPremium" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "linkedin" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "personalWebsite" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "totalPosts" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "totalReads" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "twitter" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "youtube" TEXT NOT NULL DEFAULT '';

-- CreateTable
CREATE TABLE "Blogs" (
    "id" SERIAL NOT NULL,
    "blogTitle" TEXT NOT NULL DEFAULT '',
    "blogBanner" TEXT NOT NULL DEFAULT '',
    "blogDescription" TEXT NOT NULL DEFAULT '',
    "content" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "tags" TEXT[],
    "authorId" INTEGER NOT NULL,
    "blogTotalLikeCount" INTEGER NOT NULL DEFAULT 0,
    "blogTotalCommentCount" INTEGER NOT NULL DEFAULT 0,
    "blogTotalReads" INTEGER NOT NULL DEFAULT 0,
    "blogTotalParentComments" INTEGER NOT NULL DEFAULT 0,
    "draft" BOOLEAN NOT NULL DEFAULT false,
    "publishedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "blogUpdatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Blogs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" SERIAL NOT NULL,
    "blogId" INTEGER NOT NULL,
    "blogAuthor" INTEGER NOT NULL,
    "comment" TEXT NOT NULL DEFAULT '',
    "isReply" BOOLEAN NOT NULL DEFAULT false,
    "parentId" INTEGER,
    "commentedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "commentUpdatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Blogs_id_key" ON "Blogs"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Comment_id_key" ON "Comment"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- AddForeignKey
ALTER TABLE "Blogs" ADD CONSTRAINT "Blogs_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "Blogs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_blogAuthor_fkey" FOREIGN KEY ("blogAuthor") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Comment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
