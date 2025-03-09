import { cn } from "@/shared/lib/utils";

interface Props {
  className?: string;
  availability: 'AVAILABLE' | 'OUT_OF_STOCK' | null;
}

export const ProductAvailability: React.FC<Props> = ({ availability, className }) => {
  const availabilityMap = {
    AVAILABLE: {
      text: 'В наявності',
      color: 'text-green-500', // Зелений
    },
    OUT_OF_STOCK: {
      text: 'Відсутній',
      color: 'text-red-500', // Червоний
    },
  };

  const { text, color } = availabilityMap[availability || 'OUT_OF_STOCK'] || {
    text: 'Статус невідомий',
    color: 'text-gray-500', // Сірий як дефолт
  };

  return <span className={cn(color, className)}>{text}</span>;
};

