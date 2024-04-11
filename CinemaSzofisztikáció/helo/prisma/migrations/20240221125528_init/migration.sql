/*
  Warnings:

  - Added the required column `kritikaId` to the `Kedvencek` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ertekelesId` to the `Musor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `kedvencek` ADD COLUMN `kritikaId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `musor` ADD COLUMN `ertekelesId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Kedvencek` ADD CONSTRAINT `Kedvencek_kritikaId_fkey` FOREIGN KEY (`kritikaId`) REFERENCES `Kritika`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
