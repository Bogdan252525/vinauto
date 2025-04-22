import React from "react";

interface RatingProps {
  rating: number;
  maxRating?: number;
}

export const RatingStars: React.FC<RatingProps> = ({ rating, maxRating = 5 }) => {

  if (rating === 0) {
    return (
      <div className="text-gray-500 text-sm italic">
        Немає оцінок
      </div>
    );
  }

  return (
    <div className="flex items-center">
      {Array.from({ length: maxRating }, (_, index) => {
        const fillPercentage = Math.min(Math.max(rating - index, 0), 1) * 100;

        return (
          <svg
            key={index}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-6 h-6"
          >
            <path
              d="M12 2.5l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.27 5.82 21l1.09-6.86L2 9.27l6.91-1.01L12 2.5z"
              fill="lightgray"
            />
            <path
              d="M12 2.5l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.27 5.82 21l1.09-6.86L2 9.27l6.91-1.01L12 2.5z"
              fill="red"
              style={{
                clipPath: `inset(0 ${100 - fillPercentage}% 0 0)`,
              }}
            />
          </svg>
        );
      })}
    </div>
  );
};
