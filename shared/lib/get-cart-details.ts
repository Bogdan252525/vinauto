import { calcCArtItemTotalPrice } from './calc-cart-item-total-price';
import { CartDTO } from '../services/dto/cart.dto';

export type CartStateItem = {
  id: number;
  quantity: number;
  name: string;
  imageUrl: string;
  price: number;
  disabled: boolean;
};

interface ReturnProps {
  items: CartStateItem[];
  totalAmount: number;
}

export const getCartDetails = (data: CartDTO): ReturnProps => {
  const items = data.items.map((item) => ({
    id: item.id,
    quantity: item.quantity,
    name: item.productItem.name,
    imageUrl: item.productItem.images?.[0]?.url || '/assets/img/photo-placeholder.jpg',
    price: calcCArtItemTotalPrice(item),
    disabled: false,
  }));

  // Перерахунок загальної суми
  const totalAmount = items.reduce((sum, item) => sum + item.price, 0);

  return {
    items,
    totalAmount,
  };
};
