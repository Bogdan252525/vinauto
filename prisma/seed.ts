import { users, categories, products, images, carts, cartItem, subCategories, brands, carModels, reviews, productBrandLinks, productModelLinks } from './constants'

import { prisma } from './prisma-client'

async function up() {

	await prisma.user.createMany({
		data: users
	})

	await prisma.category.createMany({
		data: categories
	})

	await prisma.subCategory.createMany({
		data: subCategories
	})

	await prisma.brand.createMany({
		data: brands
	})

	await prisma.carModel.createMany({
		data: carModels
	})

	await prisma.product.createMany({
		data: products
	})

	await prisma.image.createMany({
		data: images
	})

	await prisma.review.createMany({
		data: reviews
	})

	await prisma.cart.createMany({
		data: carts
	})

	await prisma.cartItem.create({
		data: cartItem
	})

  await Promise.all(
    productBrandLinks.map(async (link) => {
      await prisma.product.update({
        where: { id: link.productId },
        data: {
          brands: {
            connect: link.brandIds.map((id) => ({ id })),
          },
        },
      });
    })
  );

  await Promise.all(
    productModelLinks.map(async (link) => {
      await prisma.product.update({
        where: { id: link.productId },
        data: {
          carModels: {
            connect: link.carModelIds.map((id) => ({ id })),
          },
        },
      });
    })
  );
}

async function down() {
	await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
	await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`;
	await prisma.$executeRaw`TRUNCATE TABLE "SubCategory" RESTART IDENTITY CASCADE`;
	await prisma.$executeRaw`TRUNCATE TABLE "Brand" RESTART IDENTITY CASCADE`;
	await prisma.$executeRaw`TRUNCATE TABLE "CarModel" RESTART IDENTITY CASCADE`;
	await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`;
	await prisma.$executeRaw`TRUNCATE TABLE "Image" RESTART IDENTITY CASCADE`;
	await prisma.$executeRaw`TRUNCATE TABLE "Review" RESTART IDENTITY CASCADE`;
	await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE`;
	await prisma.$executeRaw`TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE`;
}

async function main() {
	try {
		await down();
		await up();
	} catch (e) {
		console.error(e)
	}
}

main().then(async () => {
	await prisma.$disconnect();
}).catch(async (e) => {
	console.error(e);
	await prisma.$disconnect();
	process.exit(1)
})