import { prisma } from "@/prisma/prisma-client";
import { updateCartTotalAmount } from "@/shared/lib";
import { NextRequest, NextResponse } from "next/server";


export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
	try {
		const id = Number(params.id);
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Некоректний ID товару' }, { status: 400 })
    }

		const data = (await req.json()) as { quantity: number };
    if (data.quantity <= 0 || isNaN(data.quantity)) {
      return NextResponse.json({ error: 'Некоректна кількість товару' }, { status: 400 });
    }

    const token = req.cookies.get('cartToken')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Токен для кошику не знайдено' }, { status: 401 });
    }

		const cartItem = await prisma.cartItem.findFirst({
			where: {
				id,
			},
		});

		if (!cartItem) {
			return NextResponse.json({ error: 'Товар в кошику не знайдено'}, { status: 404 });
		}

    await prisma.cartItem.update({
      where: { id },
      data: { quantity: data.quantity },
    });

    let updatedUserCart;
    try {
      updatedUserCart = await updateCartTotalAmount(token);
    } catch (error) {
      console.log('[UPDATE_CART_TOTAL_AMOUNT] Error:', error);
      return NextResponse.json({ message: 'Не вдалось оновити загальну суму кошика' }, { status: 500 });
    }

		return NextResponse.json(updatedUserCart);
		
	} catch (error) {
    console.log('[CART_PATCH] Server error:', error);
    return NextResponse.json({ message: 'Не вдалось оновити кошик' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number(params.id);
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Некоректний ID товару' }, { status: 400 });
    }

    const token = req.cookies.get('cartToken')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Токен для кошику не знайдено' }, { status: 401 });
    }

    const cartItem = await prisma.cartItem.findFirst({
      where: { id },
    });

    if (!cartItem) {
      return NextResponse.json({ error: 'Товар в кошику не знайдено' }, { status: 404 });
    }

    await prisma.cartItem.delete({
      where: { id },
    });

    let updatedUserCart;
    try {
      updatedUserCart = await updateCartTotalAmount(token);
    } catch (error) {
      console.log('[UPDATE_CART_TOTAL_AMOUNT] Error:', error);
      return NextResponse.json({ error: 'Не вдалось оновити загальну суму кошика' }, { status: 500 });
    }

    return NextResponse.json(updatedUserCart);
  } catch (error) {
    console.log('[CART_DELETE] Server error:', error);
    return NextResponse.json({ message: 'Не вдалось оновити кошик' }, { status: 500 });
  }
}
