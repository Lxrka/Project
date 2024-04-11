/*
  Warnings:

  - You are about to drop the column `ertekeles` on the `musor` table. All the data in the column will be lost.
  - You are about to drop the column `kedvencekId` on the `musor` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `musor` DROP COLUMN `ertekeles`,
    DROP COLUMN `kedvencekId`;
