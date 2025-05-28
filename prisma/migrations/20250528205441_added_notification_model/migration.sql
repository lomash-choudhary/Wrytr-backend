-- CreateEnum
CREATE TYPE "notificationTypeEnum" AS ENUM ('like', 'comment', 'reply');

-- CreateTable
CREATE TABLE "Notification" (
    "id" SERIAL NOT NULL,
    "notificationType" "notificationTypeEnum" NOT NULL,
    "userId" INTEGER NOT NULL,
    "userIdForNotificationGen" INTEGER NOT NULL,
    "commentId" INTEGER,
    "repliedCommentId" INTEGER,
    "repliedToParentCommentId" INTEGER,
    "notificationSeen" BOOLEAN NOT NULL DEFAULT false,
    "notificationGenTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Notification_id_key" ON "Notification"("id");

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userIdForNotificationGen_fkey" FOREIGN KEY ("userIdForNotificationGen") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_repliedCommentId_fkey" FOREIGN KEY ("repliedCommentId") REFERENCES "Comment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_repliedToParentCommentId_fkey" FOREIGN KEY ("repliedToParentCommentId") REFERENCES "Comment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
