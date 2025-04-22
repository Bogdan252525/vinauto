import { prisma } from '@/prisma/prisma-client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const subCategoryId = req.nextUrl.searchParams.get('subCategoryId');

    if (!subCategoryId || isNaN(Number(subCategoryId))) {
      return NextResponse.json({ error: 'Некоректний ID підкатегорії' }, { status: 400 });
    }

    const filters = await prisma.product.findMany({
      where: { subCategoryId: parseInt(subCategoryId) },
      select: {
        manufacturer: true,
        countryOfOrigin: true,
        brands: { select: { name: true } },
      },
    });

    if (filters.length === 0) {
      return NextResponse.json(
        { manufacturers: [], countries: [], brands: [], message: 'Дані не знайдено' },
        { status: 404 }
      );
    }

    const uniqueManufacturers = Array.from(new Set(filters.map((p) => p.manufacturer || 'Невідомо')));
    const uniqueCountries = Array.from(new Set(filters.map((p) => p.countryOfOrigin || 'Невідомо')));
    const uniqueBrands = Array.from(new Set(filters.flatMap((p) => p.brands.map((b) => b.name))));

    const aggregatedFilters = {
      manufacturers: uniqueManufacturers,
      countries: uniqueCountries,
      brands: uniqueBrands,
    };

    return NextResponse.json(aggregatedFilters, { status: 200 });
  } catch (error) {
    console.error('[GET_FILTERS] Server error:', { error });
    return NextResponse.json({ message: 'Не вдалось отримати фільтри' }, { status: 500 });
  }
}
