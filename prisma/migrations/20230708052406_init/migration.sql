-- CreateTable
CREATE TABLE "travelPlanners" (
    "id" SERIAL NOT NULL,
    "travelStops" INTEGER[],

    CONSTRAINT "travelPlanners_pkey" PRIMARY KEY ("id")
);
