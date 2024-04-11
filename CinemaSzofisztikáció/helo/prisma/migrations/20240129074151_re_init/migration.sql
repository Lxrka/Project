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

-- CreateTable
CREATE TABLE `Rendeles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `rendelesDatum` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `rendeloId` INTEGER NOT NULL,
    `termekId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Termek` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nev` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Rendeles` ADD CONSTRAINT `Rendeles_rendeloId_fkey` FOREIGN KEY (`rendeloId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Rendeles` ADD CONSTRAINT `Rendeles_termekId_fkey` FOREIGN KEY (`termekId`) REFERENCES `Termek`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
