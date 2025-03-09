import { getFeaturedProducts } from "@/shared/lib";
import { ProductCard } from "./product-card";
import { ProductWithImages } from "@/types/types";
import { cn } from "@/shared/lib/utils";

interface Props {
	className?: string;
}

export const FeaturedProducts: React.FC<Props> = async ({ className, }) => {
  const products: ProductWithImages[] = await getFeaturedProducts();

  return (
		<ul className={cn(className)}>
			{products && products.length > 0 ? (
				products.map((product) => (
					<ProductCard key={product.id} product={product} />
				))
			) : (
				<p>Немає рекомендованих продуктів</p>
			)}
		</ul>
	);
};
