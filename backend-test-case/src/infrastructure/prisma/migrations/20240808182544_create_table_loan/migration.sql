-- CreateTable
CREATE TABLE `book` (
    `code` VARCHAR(10) NOT NULL DEFAULT '',
    `title` VARCHAR(50) NULL,
    `author` VARCHAR(50) NULL,
    `stock` INTEGER NULL,
    `status` ENUM('exist', 'borrowed') NOT NULL DEFAULT 'exist',

    PRIMARY KEY (`code`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `member` (
    `code` VARCHAR(10) NOT NULL DEFAULT '',
    `name` VARCHAR(50) NULL,

    PRIMARY KEY (`code`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `loan` (
    `code_book` VARCHAR(10) NOT NULL DEFAULT '',
    `code_member` VARCHAR(10) NOT NULL DEFAULT '',
    `quantity` INTEGER NOT NULL DEFAULT 1,
    `inserted_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`code_book`, `code_member`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `loan` ADD CONSTRAINT `loan_code_book_fkey` FOREIGN KEY (`code_book`) REFERENCES `book`(`code`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `loan` ADD CONSTRAINT `loan_code_member_fkey` FOREIGN KEY (`code_member`) REFERENCES `member`(`code`) ON DELETE RESTRICT ON UPDATE CASCADE;
