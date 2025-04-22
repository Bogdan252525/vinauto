import { cn } from "@/shared/lib/utils";

interface Props {
  className?: string;
  availability: 'AVAILABLE' | 'OUT_OF_STOCK' | null;
}

export const ProductAvailability: React.FC<Props> = ({
  availability = 'OUT_OF_STOCK',
  className,
}) => {
  const availabilityMap: Record<
    NonNullable<Props['availability']>,
    { text: string; color: string }
  > = {
    AVAILABLE: {
      text: 'В наявності',
      color: 'text-green-500',
    },
    OUT_OF_STOCK: {
      text: 'Відсутній',
      color: 'text-red-500',
    },
  };

  const { text, color } = availability
    ? availabilityMap[availability]
    : { text: 'Статус невідомий', color: 'text-gray-500' };

  return <span className={cn(color, className)} title={text}>{text}</span>;
};
