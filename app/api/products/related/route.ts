import { prisma } from '@/prisma/prisma-client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const subCategoryId = req.nextUrl.searchParams.get('subCategoryId');
    const carModelIdsParam = req.nextUrl.searchParams.get('carModelIds');

    if (!subCategoryId) {
      return NextResponse.json({ error: "subCategoryId є обов'язковим" }, { status: 400 });
    }

    const carModelIds = carModelIdsParam ? carModelIdsParam.split(',').map(Number) : [];

    const whereClause: {
      subCategoryId: number;
      carModels?: { some: { id: { in: number[] } } };
    } = {
      subCategoryId: Number(subCategoryId),
    };

    if (carModelIds.length > 0) {
      whereClause.carModels = {
        some: { id: { in: carModelIds } },
      };
    }

    const relatedProducts = await prisma.product.findMany({
      where: whereClause,
      include: {
        images: {
          where: { isPrimary: true },
          select: { url: true },
        },
        subCategory: {
          include: {
            category: {
              select: { id: true, name: true },
            },
          },
        },
      },
    });

    if (relatedProducts.length === 0) {
      return NextResponse.json({ products: [], message: 'Продуктів не знайдено' }, { status: 404 });
    }

    return NextResponse.json(relatedProducts, { status: 200 });
  } catch (error) {
    console.error('[GET_RELATED_PRODUCT] Server error:', error);
    return NextResponse.json({ error: 'Не вдалося отримати подібні продукти' }, { status: 500 });
  }
}
