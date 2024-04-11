/*
  Warnings:

  - Added the required column `ar` to the `Termek` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `termek` ADD COLUMN `ar` INTEGER NOT NULL;
