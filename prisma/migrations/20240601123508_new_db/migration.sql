/*
  Warnings:

  - You are about to drop the column `expires` on the `sessions` table. All the data in the column will be lost.
  - You are about to drop the column `session_token` on the `sessions` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `sessions` table. All the data in the column will be lost.
  - You are about to drop the column `email_verified` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `accounts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `verificationtokens` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `beginTime` to the `sessions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endTime` to the `sessions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalTime` to the `sessions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `sessions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `accounts` DROP FOREIGN KEY `accounts_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `sessions` DROP FOREIGN KEY `sessions_user_id_fkey`;

-- DropIndex
DROP INDEX `sessions_session_token_key` ON `sessions`;

-- AlterTable
ALTER TABLE `sessions` DROP COLUMN `expires`,
    DROP COLUMN `session_token`,
    DROP COLUMN `user_id`,
    ADD COLUMN `beginTime` DATETIME(3) NOT NULL,
    ADD COLUMN `endTime` DATETIME(3) NOT NULL,
    ADD COLUMN `totalTime` DATETIME(3) NOT NULL,
    ADD COLUMN `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `email_verified`,
    DROP COLUMN `image`;

-- DropTable
DROP TABLE `accounts`;

-- DropTable
DROP TABLE `verificationtokens`;

-- CreateTable
CREATE TABLE `Goals` (
    `id` VARCHAR(191) NOT NULL,
    `duration` INTEGER NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `sessions` ADD CONSTRAINT `sessions_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Goals` ADD CONSTRAINT `Goals_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
