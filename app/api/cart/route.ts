import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";
import crypto from 'crypto';
import { findOrCreateCart, updateCartTotalAmount } from "@/shared/lib";
import { CreateCartItemValues } from "@/shared/services/dto/cart.dto";


export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('cartToken')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Токен для кошику не знайдено' }, { status: 401 });
    }

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
                    isPrimary: true,
                  },
                  select: {
                    url: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!userCart) {
      return NextResponse.json({ totalAmount: 0, cart: [] });
    }

    return NextResponse.json(userCart);
  } catch (error) {
    console.log('[CART_GET] Server error:', error);
    return NextResponse.json({ message: 'Не вдалось отримати кошик' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    let token = req.cookies.get('cartToken')?.value;

    if (!token) {
      token = crypto.randomUUID();
    } else if (typeof token !== 'string') {
      return NextResponse.json({ error: 'Невалідний токен для кошика' }, { status: 400 });
    }

    const userCart = await findOrCreateCart(token);

    const data = (await req.json()) as CreateCartItemValues;

    if (!data || !data.productItemId) {
      return NextResponse.json({ error: 'Некоректні дані для створення товару в кошику' }, { status: 400 });
    }

    await prisma.$transaction(async (prisma) => {
      const findCartItem = await prisma.cartItem.findFirst({
        where: {
          cartId: userCart.id,
          productItemId: data.productItemId,
        },
      });

      if (findCartItem) {
        await prisma.cartItem.update({
          where: {
            id: findCartItem.id,
          },
          data: {
            quantity: findCartItem.quantity + 1,
          },
        });
      } else {
        await prisma.cartItem.create({
          data: {
            cartId: userCart.id,
            productItemId: data.productItemId,
            quantity: 1,
          },
        });
      }
    });

    const updatedUserCart = await updateCartTotalAmount(token);
    const resp = NextResponse.json(updatedUserCart);
    resp.cookies.set('cartToken', token);
    return resp;

  } catch (error) {
    console.log('[CART_POST] Server error:', error);
    return NextResponse.json({ message: 'Не вдалось оновити кошик' }, { status: 500 });
  }
}
