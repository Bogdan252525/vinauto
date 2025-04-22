import { prisma } from '@/prisma/prisma-client';

export async function getFeaturedProducts() {
  try {
    const featuredProducts = await prisma.product.findMany({
      where: {
        isFeatured: true,
      },
      include: {
        images: {
          where: { isPrimary: true },
          select: { url: true, isPrimary: true },
        },
        subCategory: {
          include: {
            category: {
              select: {
                id: true,
              },
            },
          },
        },
      },
      orderBy: {
        status: 'asc',
      },
    });

    return featuredProducts;
  } catch (error) {
    console.error('Failed to fetch featured products:', error);
    throw new Error('Не вдалося отримати featured продукти.');
  }
}
