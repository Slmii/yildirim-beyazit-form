/*
  Warnings:

  - You are about to alter the column `birthday` on the `Member` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `Timestamp`.
  - You are about to drop the column `month` on the `Payment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Member` MODIFY `birthday` TIMESTAMP NOT NULL;

-- AlterTable
ALTER TABLE `Payment` DROP COLUMN `month`;
