import { prisma } from "@/prisma/prisma-client";
import { ProductDetail } from "@/shared/components/shared";


export default async function ProductPage({
  params: { productId },
}: {
  params: { productId: string };
}) {
  const id = parseInt(productId, 10);

  if (isNaN(id)) {
    return (
      <div className="pt-10 pl-4">Некоректний ідентифікатор продукту.</div>
    );
  }

  let product = null;

  try {
    product = await prisma.product.findUnique({
      where: { id },
      include: {
        images: true,
        brands: true,
        carModels: true,
        reviews: {
          include : {
            user: {
              select: {
                firstName: true,
                lastName: true,
              }
            }
          }
        }
      },
    });
  } catch (error) {
    console.error("Помилка при отриманні продукту", error);
    return (
      <div>
        <p>Сталася помилка при завантаженні продукту</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div>
        <p>Продукт не знайдено.</p>
      </div>
    );
  }

  return <ProductDetail product={product} />;
}

