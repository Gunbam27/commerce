import * as dotenv from 'dotenv';
import * as path from 'path';
dotenv.config({ path: path.resolve(__dirname, '../.env') });
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter } as any);

async function main() {
  // 기존 데이터 삭제 (선택 사항)
  await prisma.cartItem.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  // 카테고리 생성
  const categories = await Promise.all([
    prisma.category.create({ data: { name: 'T-Shirts' } }),
    prisma.category.create({ data: { name: 'Shorts' } }),
    prisma.category.create({ data: { name: 'Shirts' } }),
    prisma.category.create({ data: { name: 'Hoodies' } }),
    prisma.category.create({ data: { name: 'Jeans' } }),
  ]);

  const tshirtsId = categories[0].id;
  const shortsId = categories[1].id;
  const shirtsId = categories[2].id;
  const jeansId = categories[4].id;

  // 상품 데이터 생성
  const products = [
    {
      name: "Gradient Graphic T-shirt",
      price: 145,
      stock: 100,
      images: ["/assets/clothes.png"],
      categoryId: tshirtsId,
      description: "A stylish gradient graphic t-shirt made from 100% cotton."
    },
    {
      name: "Polo with Tipping Details",
      price: 180,
      stock: 50,
      images: ["/assets/clothes.png"],
      categoryId: tshirtsId,
      description: "Classic polo shirt with elegant tipping details on the collar and sleeves."
    },
    {
      name: "Black Striped T-shirt",
      price: 120,
      stock: 75,
      images: ["/assets/clothes.png"],
      categoryId: tshirtsId,
      description: "Comfortable black t-shirt with subtle stripes."
    },
    {
      name: "Skinny Fit Jeans",
      price: 240,
      stock: 30,
      images: ["/assets/clothes.png"],
      categoryId: jeansId,
      description: "Modern skinny fit jeans with a touch of stretch for comfort."
    },
    {
      name: "Checkered Shirt",
      price: 180,
      stock: 45,
      images: ["/assets/clothes.png"],
      categoryId: shirtsId,
      description: "Classic checkered shirt suitable for both casual and semi-formal occasions."
    },
    {
      name: "Sleeve Striped T-shirt",
      price: 130,
      stock: 60,
      images: ["/assets/clothes.png"],
      categoryId: tshirtsId,
      description: "Short sleeve t-shirt featuring bold stripes on the sleeves."
    },
    {
      name: "Vertical Striped Shirt",
      price: 212,
      stock: 25,
      images: ["/assets/clothes.png"],
      categoryId: shirtsId,
      description: "Stylish vertical striped shirt that offers a slim and tall appearance."
    },
    {
      name: "Courage Graphic T-shirt",
      price: 145,
      stock: 80,
      images: ["/assets/clothes.png"],
      categoryId: tshirtsId,
      description: "Graphic t-shirt with a bold 'Courage' print."
    },
    {
      name: "Loose Fit Bermuda Shorts",
      price: 80,
      stock: 55,
      images: ["/assets/clothes.png"],
      categoryId: shortsId,
      description: "Comfortable loose-fit Bermuda shorts perfect for summer days."
    }
  ];

  for (const product of products) {
    await prisma.product.create({
      data: product
    });
  }

  console.log('Seed data created successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
