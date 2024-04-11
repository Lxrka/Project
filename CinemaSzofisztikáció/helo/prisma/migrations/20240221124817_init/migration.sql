/*
  Warnings:

  - You are about to drop the `rendeles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `termek` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `rendeles` DROP FOREIGN KEY `Rendeles_rendeloId_fkey`;

-- DropForeignKey
ALTER TABLE `rendeles` DROP FOREIGN KEY `Rendeles_termekId_fkey`;

-- DropTable
DROP TABLE `rendeles`;

-- DropTable
DROP TABLE `termek`;

-- DropTable
DROP TABLE `users`;

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

-- CreateTable
CREATE TABLE `Kedvencek` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `kedvecekId` INTEGER NOT NULL,
    `musorId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Musor` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nev` VARCHAR(191) NOT NULL,
    `kritikaId` INTEGER NOT NULL,
    `kategoria` VARCHAR(191) NOT NULL,
    `kedvencekId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Kritika` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `felhasznaloId` INTEGER NOT NULL,
    `musorId` INTEGER NOT NULL,
    `tartalma` VARCHAR(191) NOT NULL,
    `ertekeles` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Kedvencek` ADD CONSTRAINT `Kedvencek_kedvecekId_fkey` FOREIGN KEY (`kedvecekId`) REFERENCES `Felhasznalok`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Kedvencek` ADD CONSTRAINT `Kedvencek_musorId_fkey` FOREIGN KEY (`musorId`) REFERENCES `Musor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
