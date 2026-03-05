import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

const prisma = new PrismaClient({
  adapter: new PrismaPg({
    connectionString: process.env.DATABASE_URL,
  }),
});

async function main() {
  const products = require(path.join(__dirname, 'products.json'));

  for (const product of products) {
    const { id, ...rest } = product;

    await prisma.product.create({
      data: {
        ...rest,
        created_at: new Date(rest.created_at),
        updated_at: new Date(rest.updated_at),
      },
    });
  }

  console.log(`Seeded ${products.length} products`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
