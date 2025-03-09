import { Cart, CartItem, Product } from "@prisma/client";


export type CartItemDTO = CartItem & {
	productItem: Product & {
		images: {
			url: string;
		}[];
	}
}

export interface CreateCartItemValues {
	productItemId: number;
}

export interface CartDTO extends Cart {
	items: CartItemDTO[];
}