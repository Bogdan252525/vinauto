import { Prisma } from '@prisma/client';
import { prisma } from '@/prisma/prisma-client';
import { ProductsByCategory } from '@/shared/components/shared';

export default async function ProductsPage({
  params,
  searchParams,
}: {
  params: { categoryId: string; subcategoryId: string };
  searchParams: { [key: string]: string };
}) {
  const subCategoryId = parseInt(params.subcategoryId, 10);
  const { manufacturer, country, brand, carModel, sortBy, page = '1' } = searchParams;

  if (isNaN(subCategoryId)) {
    return (
      <div className="pt-10 pl-4">Некоректний ідентифікатор підкатегорії.</div>
    );
  }

  const pageNumber = parseInt(page, 10);
  if (isNaN(pageNumber) || pageNumber < 1) {
    return (
      <div className="pt-10 pl-4">Некоректний номер сторінки.</div>
    );
  }

  const itemsPerPage = 24;

  let orderBy: Prisma.ProductOrderByWithRelationInput = {};
  if (sortBy === 'rating_desc') {
    orderBy = { averageRating: 'desc' };
  } else if (sortBy === 'price_asc') {
    orderBy = { price: 'asc' };
  } else if (sortBy === 'price_desc') {
    orderBy = { price: 'desc' };
  } else if (sortBy === 'name_asc') {
    orderBy = { name: 'asc' };
  }

  const [products, totalProducts] = await prisma.$transaction([
    prisma.product.findMany({
      where: {
        subCategoryId,
        ...(manufacturer && { manufacturer }),
        ...(country && { countryOfOrigin: country }),
        ...(brand && { brands: { some: { name: brand } } }),
        ...(carModel && { carModels: { some: { name: carModel } } }),
      },
      include: {
        images: { select: { url: true, isPrimary: true } },
        brands: { select: { name: true } },
        carModels: { select: { name: true } },
      },
      orderBy,
      skip: (pageNumber - 1) * itemsPerPage,
      take: itemsPerPage,
    }),
    prisma.product.count({
      where: {
        subCategoryId,
        ...(manufacturer && { manufacturer }),
        ...(country && { countryOfOrigin: country }),
        ...(brand && { brands: { some: { name: brand } } }),
        ...(carModel && { carModels: { some: { name: carModel } } }),
      },
    }),
  ]);

  const totalPages = Math.ceil(totalProducts / itemsPerPage);

  if (!products || products.length === 0) {
    return (
      <div className="pt-10 pl-4">
        <p className="text-gray-700">Нажаль, для цієї підкатегорії продуктів не знайдено.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <ProductsByCategory
        products={products}
        currentPage={pageNumber}
        totalPages={totalPages}
      />
    </div>
  );
}
