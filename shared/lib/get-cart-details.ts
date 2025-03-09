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
		imageUrl: item.productItem.images[0].url,
		price: calcCArtItemTotalPrice(item),
		disabled: false,
	}))

	return {
		items,
		totalAmount: data.totalAmount,
	}
}
