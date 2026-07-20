import { config } from "dotenv";
import { resolve } from "path";
config({ path: resolve(__dirname, "../../.env") });

import { prisma } from "../lib/prisma";

async function check() {
  const c = await prisma.category.findMany();
  console.log("Category images:", c.map(x => x.image).filter(Boolean));
  
  const p = await prisma.product.findMany();
  console.log("Product images:", p.map(x => x.images).filter(x => x !== "[]" && x));
  
  await prisma.$disconnect();
}

check().catch(console.error);
