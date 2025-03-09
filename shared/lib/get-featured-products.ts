import { prisma } from "@/prisma/prisma-client";


export async function getFeaturedProducts() {
  const getFeaturedProducts = await prisma.product.findMany({
    where: {
      isFeatured: true,
    },
		include: {
      images: {
        where: { isPrimary: true },
        select: { url: true, isPrimary: true },
      },
    },
    orderBy: {
      status: 'asc',
    },
  });

	console.log('hui');

	return getFeaturedProducts;
}
