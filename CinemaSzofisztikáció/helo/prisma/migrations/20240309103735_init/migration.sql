/*
  Warnings:

  - You are about to drop the column `kedvecekId` on the `kedvencek` table. All the data in the column will be lost.
  - You are about to drop the column `kritikaId` on the `kedvencek` table. All the data in the column will be lost.
  - You are about to drop the column `ertekelesId` on the `musor` table. All the data in the column will be lost.
  - You are about to drop the column `kritikaId` on the `musor` table. All the data in the column will be lost.
  - You are about to drop the `felhasznalok` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `felhasznaloId` to the `Kedvencek` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ertekeles` to the `Musor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kep` to the `Musor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kiadas` to the `Musor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `leiras` to the `Musor` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `kedvencek` DROP FOREIGN KEY `Kedvencek_kedvecekId_fkey`;

-- DropForeignKey
ALTER TABLE `kedvencek` DROP FOREIGN KEY `Kedvencek_kritikaId_fkey`;

-- AlterTable
ALTER TABLE `kedvencek` DROP COLUMN `kedvecekId`,
    DROP COLUMN `kritikaId`,
    ADD COLUMN `felhasznaloId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `musor` DROP COLUMN `ertekelesId`,
    DROP COLUMN `kritikaId`,
    ADD COLUMN `ertekeles` INTEGER NOT NULL,
    ADD COLUMN `kep` VARCHAR(191) NOT NULL,
    ADD COLUMN `kiadas` DATETIME(3) NOT NULL,
    ADD COLUMN `leiras` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `felhasznalok`;

-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `felhasznalonev` VARCHAR(191) NOT NULL,
    `szulev` VARCHAR(191) NOT NULL,
    `telszam` VARCHAR(191) NOT NULL,
    `jelszo` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Kedvencek` ADD CONSTRAINT `Kedvencek_felhasznaloId_fkey` FOREIGN KEY (`felhasznaloId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Kritika` ADD CONSTRAINT `Kritika_felhasznaloId_fkey` FOREIGN KEY (`felhasznaloId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Kritika` ADD CONSTRAINT `Kritika_musorId_fkey` FOREIGN KEY (`musorId`) REFERENCES `Musor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
