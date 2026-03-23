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

const BASE_IMAGE_URL = 'https://vhehjdaiqudprtxhmgvt.supabase.co/storage/v1/object/public/product-image/';

async function main() {
  console.log('Cleaning up existing data...');
  await prisma.cartItem.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  console.log('Creating categories...');
  const categoriesMap: Record<string, any> = {};
  const categoryNames = ['Hoodies', 'Jeans', 'Shirts', 'Shorts', 'T-Shirts'];
  
  for (const name of categoryNames) {
    categoriesMap[name] = await prisma.category.create({ data: { name } });
  }

  const products = [
    {
      name: 'Classic Black Hoodie',
      price: 85.0,
      stock: 50,
      images: [`${BASE_IMAGE_URL}hood001_black.png`, `${BASE_IMAGE_URL}hood001_skyblue.png`],
      colors: ['Black', 'Skyblue'],
      categoryId: categoriesMap['Hoodies'].id,
      description: 'A cozy and stylish hoodie available in multiple colors.'
    },
    {
      name: 'Premium Pink Hoodie',
      price: 89.0,
      stock: 30,
      images: [`${BASE_IMAGE_URL}hood002_pink.png`],
      colors: ['Pink'],
      categoryId: categoriesMap['Hoodies'].id,
      description: 'A premium soft hoodie with a vibrant pink color.'
    },
    {
      name: 'Slim Fit Blue Jeans',
      price: 120.0,
      stock: 45,
      images: [`${BASE_IMAGE_URL}jean001_blue.png`],
      colors: ['Blue'],
      categoryId: categoriesMap['Jeans'].id,
      description: 'Modern slim-fit jeans made with durable denim.'
    },
    {
      name: 'Classic Black Jeans',
      price: 115.0,
      stock: 40,
      images: [`${BASE_IMAGE_URL}jean002_black.png`],
      colors: ['Black'],
      categoryId: categoriesMap['Jeans'].id,
      description: 'Essential black jeans for every wardrobe.'
    },
    {
      name: 'Casual Cotton Shirt',
      price: 65.0,
      stock: 60,
      images: [`${BASE_IMAGE_URL}shirt001_pink.png`, `${BASE_IMAGE_URL}shirt001_yellow.png`],
      colors: ['Pink', 'Yellow'],
      categoryId: categoriesMap['Shirts'].id,
      description: 'Breathable cotton shirt perfect for casual outings.'
    },
    {
      name: 'Smart Look Shirt',
      price: 75.0,
      stock: 35,
      images: [`${BASE_IMAGE_URL}shirt002_navy.png`, `${BASE_IMAGE_URL}shirt002_skyblue.png`],
      colors: ['Navy', 'Skyblue'],
      categoryId: categoriesMap['Shirts'].id,
      description: 'A sharp, smart-looking shirt for professional and social events.'
    },
    {
      name: 'Summer Cargo Shorts',
      price: 45.0,
      stock: 80,
      images: [`${BASE_IMAGE_URL}shorts001_black.png`, `${BASE_IMAGE_URL}shorts001_blue.png`],
      colors: ['Black', 'Blue'],
      categoryId: categoriesMap['Shorts'].id,
      description: 'Durable and practical cargo shorts for summer adventures.'
    },
    {
      name: 'Classic White Shorts',
      price: 42.0,
      stock: 25,
      images: [`${BASE_IMAGE_URL}shorts002_white.png`],
      colors: ['White'],
      categoryId: categoriesMap['Shorts'].id,
      description: 'Clean and simple white shorts for a fresh summer look.'
    },
    {
      name: 'Essential White T-Shirt',
      price: 25.0,
      stock: 120,
      images: [`${BASE_IMAGE_URL}tshirt001_white.png`],
      colors: ['White'],
      categoryId: categoriesMap['T-Shirts'].id,
      description: 'The foundation of any outfit, a high-quality white t-shirt.'
    },
    {
      name: 'Essential Black T-Shirt',
      price: 25.0,
      stock: 110,
      images: [`${BASE_IMAGE_URL}tshirt002_black.png`],
      colors: ['Black'],
      categoryId: categoriesMap['T-Shirts'].id,
      description: 'Versatile black t-shirt made from premium soft cotton.'
    }
  ];

  console.log('Inserting products...');
  for (const product of products) {
    await prisma.product.create({
      data: {
        ...product,
        sizes: ['S', 'M', 'L', 'XL', 'XXL']
      }
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
