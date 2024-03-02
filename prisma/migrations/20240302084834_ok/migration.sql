/*
  Warnings:

  - You are about to drop the column `customAttributes` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `externalId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `phoneNumbers` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[external_id]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `custom_attributes` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `external_id` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `first_name` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_name` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_externalId_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "customAttributes",
DROP COLUMN "externalId",
DROP COLUMN "firstName",
DROP COLUMN "lastName",
DROP COLUMN "phoneNumbers",
ADD COLUMN     "custom_attributes" JSONB NOT NULL,
ADD COLUMN     "external_id" TEXT NOT NULL,
ADD COLUMN     "first_name" TEXT NOT NULL,
ADD COLUMN     "last_name" TEXT NOT NULL,
ADD COLUMN     "phone_numbers" TEXT[];

-- CreateIndex
CREATE UNIQUE INDEX "User_external_id_key" ON "User"("external_id");
