-- CreateEnum
CREATE TYPE "Brand" AS ENUM ('Nike', 'Adidas', 'Puma', 'Vans');

-- CreateEnum
CREATE TYPE "Category" AS ENUM ('sneakers', 'flats', 'Canvas', 'heels');

-- CreateEnum
CREATE TYPE "Color" AS ENUM ('white', 'red', 'green', 'black', 'blue');

-- CreateEnum
CREATE TYPE "PriceRange" AS ENUM ('cheap', 'affordable', 'expensive');

-- CreateEnum
CREATE TYPE "ProductStatus" AS ENUM ('available', 'unavailable');

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "imgSource" TEXT NOT NULL,
    "brand" "Brand" NOT NULL,
    "category" "Category" NOT NULL,
    "color" "Color" NOT NULL,
    "description" TEXT NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "prices" JSONB NOT NULL,
    "priceRange" "PriceRange" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "tags" TEXT[],
    "status" "ProductStatus" NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);
