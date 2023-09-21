-- CreateTable
CREATE TABLE "speficiations_cars" (
    "id" TEXT NOT NULL,
    "car_id" TEXT,
    "specification_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "speficiations_cars_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "speficiations_cars" ADD CONSTRAINT "speficiations_cars_car_id_fkey" FOREIGN KEY ("car_id") REFERENCES "cars"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "speficiations_cars" ADD CONSTRAINT "speficiations_cars_specification_id_fkey" FOREIGN KEY ("specification_id") REFERENCES "specifications"("id") ON DELETE SET NULL ON UPDATE SET NULL;
