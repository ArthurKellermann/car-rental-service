/*
  Warnings:

  - You are about to drop the `speficiations_cars` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "speficiations_cars" DROP CONSTRAINT "speficiations_cars_car_id_fkey";

-- DropForeignKey
ALTER TABLE "speficiations_cars" DROP CONSTRAINT "speficiations_cars_specification_id_fkey";

-- DropTable
DROP TABLE "speficiations_cars";

-- CreateTable
CREATE TABLE "specifications_cars" (
    "id" TEXT NOT NULL,
    "car_id" TEXT,
    "specification_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "specifications_cars_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cars_image" (
    "id" TEXT NOT NULL,
    "car_id" TEXT,
    "name" TEXT NOT NULL,
    "image_name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "cars_image_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "specifications_cars" ADD CONSTRAINT "specifications_cars_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "cars"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "specifications_cars" ADD CONSTRAINT "specifications_cars_specification_id_fkey" FOREIGN KEY ("specification_id") REFERENCES "specifications"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "cars_image" ADD CONSTRAINT "cars_image_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "cars"("id") ON DELETE SET NULL ON UPDATE SET NULL;
