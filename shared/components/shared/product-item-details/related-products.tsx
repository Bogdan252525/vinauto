import { Api } from '@/shared/services/api-client';
import {
  allProductInformation,
  ProductWithSubCategoryAndCategory,
} from '@/types/types';
import React, { useEffect, useState } from 'react';
import { ProductCardMini } from '../product-card-mini';

interface Props {
  className?: string;
  product?: allProductInformation;
}

export const RelatedProducts: React.FC<Props> = ({ product, className }) => {
  const [relatedProducts, setRelatedProducts] = useState<
    ProductWithSubCategoryAndCategory[]
  >([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      if (!product?.subCategoryId) {
        setError(
          'subCategoryId є обов’язковим для отримання пов’язаних продуктів.'
        );
        return;
      }

      try {
        const models = product.carModels?.map((model) => model.id) || [];
        const related = await Api.related.related(
          product.subCategoryId,
          models
        );

        const filteredProducts = related.filter(
          (relatedProduct) => relatedProduct.id !== product.id
        );

        setRelatedProducts(filteredProducts);
        setError(null);
      } catch {
        setError('Помилка при отриманні даних.');
      }
    };

    fetchRelatedProducts();
  }, [product]);

  return (
    <ul className={className}>
      {error ? (
        <li className="error-message">{error}</li>
      ) : relatedProducts.length > 0 ? (
        relatedProducts.map((relatedProduct) => (        
          <ProductCardMini
            key={relatedProduct.id}
            path={`/categories/${relatedProduct.subCategory.category.id}/subcategories/${relatedProduct.subCategoryId}/products/${relatedProduct.id}`}
            product={relatedProduct}
          />
        ))
      ) : (
        <li>Немає пов’язаних продуктів.</li>
      )}
    </ul>
  );
};
