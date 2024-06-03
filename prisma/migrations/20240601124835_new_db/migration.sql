-- DropForeignKey
ALTER TABLE `goals` DROP FOREIGN KEY `Goals_userId_fkey`;

-- AddForeignKey
ALTER TABLE `goals` ADD CONSTRAINT `goals_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
