import { users, categories, products, images, carts, cartItem } from './constants'
import { prisma } from './prisma-client'

async function up() {

	await prisma.user.createMany({
		data: users
	})

	await prisma.category.createMany({
		data: categories
	})

	await prisma.product.createMany({
		data: products
	})

	await prisma.image.createMany({
		data: images
	})

	await prisma.cart.createMany({
		data: carts
	})

	await prisma.cartItem.create({
		data: cartItem
	})
}

async function down() {
	await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
	await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`;
	await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`;
	await prisma.$executeRaw`TRUNCATE TABLE "Image" RESTART IDENTITY CASCADE`;
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