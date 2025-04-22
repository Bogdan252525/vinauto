import { prisma } from '@/prisma/prisma-client';
import { SidebarMain } from '../shared';
import { Category } from '@prisma/client';

export default async function SidebarServer({
  children,
}: {
  children: React.ReactNode;
}) {
  let categories: Category[] = [];
  try {
    categories = await prisma.category.findMany();
  } catch (error) {
    console.error('[SidebarServer] Помилка отримання категорій:', error);
  }

  if (!categories || categories.length === 0) {
    return (
      <aside className='mt-4 ml-4'>
        <p>Категорій не знайдено.</p>
      </aside>
    );
  }

  return (
    <aside>
      <SidebarMain categories={categories}>
        {children}
      </SidebarMain>
    </aside>
  );
}
