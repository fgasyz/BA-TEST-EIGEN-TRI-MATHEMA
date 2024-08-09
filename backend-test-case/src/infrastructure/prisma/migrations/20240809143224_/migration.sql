/*
  Warnings:

  - You are about to drop the column `inserted_at` on the `loan` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `loan` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `loan` DROP FOREIGN KEY `loan_code_book_fkey`;

-- DropForeignKey
ALTER TABLE `loan` DROP FOREIGN KEY `loan_code_member_fkey`;

-- AlterTable
ALTER TABLE `loan` DROP COLUMN `inserted_at`,
    DROP COLUMN `updated_at`,
    ADD COLUMN `insert_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `return_at` DATETIME(3) NULL;

-- AddForeignKey
ALTER TABLE `loan` ADD CONSTRAINT `loan_code_book_fkey` FOREIGN KEY (`code_book`) REFERENCES `book`(`code`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `loan` ADD CONSTRAINT `loan_code_member_fkey` FOREIGN KEY (`code_member`) REFERENCES `member`(`code`) ON DELETE CASCADE ON UPDATE CASCADE;
