import { CartItemDTO } from "../services/dto/cart.dto";

export const calcCArtItemTotalPrice = (item: CartItemDTO): number => {
	if (item.productItem.discountPrice) {
		return item.productItem.discountPrice * item.quantity;
	} else {
		return item.productItem.price * item.quantity;
	}
}