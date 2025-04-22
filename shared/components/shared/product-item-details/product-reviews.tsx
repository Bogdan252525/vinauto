import { ReviewForProductPage } from '@/types/types';
import React from 'react';
import { RatingStars } from '../rating-stars';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/components/ui';

interface Props {
  reviews: ReviewForProductPage[];
  className?: string;
}

export const ProductReviews: React.FC<Props> = ({ reviews, className }) => (
  <div className={cn('flex flex-col gap-4 ml-4 mb-8', className)}>
    <Button className="max-w-40 ml-auto">Залишити відгук</Button>

    {reviews.length === 0 ? (
      <div className="ml-4">Відгуки відсутні</div>
    ) : (
      reviews.map((review) => (
        <div
          className="border p-4 rounded-md"
          key={review.id}
        >
          <h2>
            {review.user
              ? `${review.user.firstName} ${review.user.lastName}`
              : 'Невідомий автор'}
          </h2>
          <RatingStars rating={review.rating} />
          <p>{review.comment}</p>
        </div>
      ))
    )}
  </div>
);
