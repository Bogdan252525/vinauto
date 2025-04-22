import { prisma } from '@/prisma/prisma-client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const subCategoryId = req.nextUrl.searchParams.get('subCategoryId');
    const brandName = req.nextUrl.searchParams.get('brand');

    if (!subCategoryId || isNaN(Number(subCategoryId))) {
      return NextResponse.json({ error: 'Некоректний ID підкатегорії' }, { status: 400 });
    }
    if (!brandName) {
      return NextResponse.json({ error: 'Ім’я бренду є обов’язковим' }, { status: 400 });
    }

    const products = await prisma.product.findMany({
      where: {
        subCategoryId: parseInt(subCategoryId),
        brands: {
          some: { name: brandName },
        },
      },
      select: {
        carModels: { select: { name: true } },
      },
    });

    if (products.length === 0) {
      return NextResponse.json({ carModels: [], message: 'Дані не знайдено' }, { status: 404 });
    }

    const uniqueCarModels = Array.from(
      new Set(products.flatMap((product) => product.carModels.map((model) => model.name)))
    );

    return NextResponse.json(uniqueCarModels, { status: 200 });
  } catch (error) {
    console.log('[GET_CAR_MODELS] Server error:', error);
    return NextResponse.json({ message: 'Не вдалось отримати дані' }, { status: 500 });
  }
}
