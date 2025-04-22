import { prisma } from '@/prisma/prisma-client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const query = req.nextUrl.searchParams.get('query');

    if (!query || query.trim() === '') {
      return NextResponse.json({ error: 'Параметр запиту (query) є обов’язковим' }, { status: 400 });
    }

    const products = await prisma.product.findMany({
      where: {
        name: {
          contains: query,
          mode: 'insensitive',
        },
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
    });

    if (products.length === 0) {
      return NextResponse.json({ products: [], message: 'Продуктів не знайдено' }, { status: 404 });
    }

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error('[GET_PRODUCTS] Server error:', error);
    return NextResponse.json({ error: 'Не вдалося отримати продукти' }, { status: 500 });
  }
}
