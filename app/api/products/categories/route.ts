import { prisma } from '@/prisma/prisma-client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const categoryId = req.nextUrl.searchParams.get('categoryId');
  const products = await prisma.product.findMany({
    where: {
      categoryId: Number(categoryId),
    },
    include: {
      images: {
        where: { isPrimary: true },
        select: { url: true }
      }
    }
  });
  return NextResponse.json(products);
}
