import { prisma } from "@/prisma/prisma-client"
import { calcCArtItemTotalPrice } from "./calc-cart-item-total-price";


export const updateCartTotalAmount = async (token: string) => {
	const userCart = await prisma.cart.findFirst({
		where: {
			token,
		},
		include: {
			items: {
				orderBy: {
					createdAt: 'desc',
				},
				include: {
					productItem: {
						include: {
							images: {
								where: {
									isPrimary: true
								},
								select: {
									url: true
								},
							},
						},
					}
				},
			},
		},
	});

	if (!userCart) {
		return 0;
	}

	const totalAmount = userCart?.items.reduce((acc, item) => {
		return acc + calcCArtItemTotalPrice(item);
	}, 0);

	return await prisma.cart.update({
		where: {
			id: userCart.id
		},
		data: {
			totalAmount,
		},
		include: {
			items: {
				orderBy: {
					createdAt: 'desc',
				},
				include: {
					productItem: {
						include: {
							images: {
								where: {
									isPrimary: true
								},
								select: {
									url: true
								},
							},
						},
					}
				}
			}
		}
	})
}