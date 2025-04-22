import { prisma } from '@/prisma/prisma-client';
import { SubCategories } from '@/shared/components/shared';

export default async function SubcategoriesPage({ params }: { params: { categoryId: string } }) {
  const categoryId = parseInt(params.categoryId);

  if (isNaN(categoryId)) {
    return (
      <div>
        <p>Некоректний ідентифікатор категорії</p>
      </div>
    );
  }

  let subCategories = [];
  try {
    subCategories = await prisma.subCategory.findMany({
      where: { categoryId },
    });
  } catch (error) {
    console.error('Помилка при отриманні підкатегорій:', error);
    return (
      <div>
        <p>Сталася помилка при завантаженні підкатегорій</p>
      </div>
    );
  }

  if (subCategories.length === 0) {
    return (
      <div>
        <p>Підкатегорії відсутні для цієї категорії</p>
      </div>
    );
  }

  return (
    <>
      <SubCategories subCategories={subCategories} />
    </>
  );
}
