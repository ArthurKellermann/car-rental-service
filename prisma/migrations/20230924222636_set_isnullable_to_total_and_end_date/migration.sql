-- DropIndex
DROP INDEX "cars_id_key";

-- DropIndex
DROP INDEX "cars_image_id_key";

-- DropIndex
DROP INDEX "rentals_id_key";

-- DropIndex
DROP INDEX "specifications_id_key";

-- DropIndex
DROP INDEX "specifications_cars_id_key";

-- DropIndex
DROP INDEX "users_id_key";

-- AlterTable
ALTER TABLE "rentals" ALTER COLUMN "end_date" DROP NOT NULL,
ALTER COLUMN "total" DROP NOT NULL;
