/*
  Warnings:

  - You are about to drop the `adatok` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `kedvencek` DROP FOREIGN KEY `Kedvencek_kedvecekId_fkey`;

-- DropTable
DROP TABLE `adatok`;

-- CreateTable
CREATE TABLE `Felhasznalok` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `felhasznalonev` VARCHAR(191) NOT NULL,
    `szulev` VARCHAR(191) NOT NULL,
    `telszam` VARCHAR(191) NOT NULL,
    `jelszo` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Felhasznalok_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Kedvencek` ADD CONSTRAINT `Kedvencek_kedvecekId_fkey` FOREIGN KEY (`kedvecekId`) REFERENCES `Felhasznalok`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
