'use client';

import React from 'react';

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/shared/components/ui/sheet';
import { getCartHeadString } from '@/shared/lib/get-cart-head-string';
import Link from 'next/link';
import { Button } from '../ui';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { CartDrawerItem } from './cart-drawer-item';
import { useCartStore } from '@/shared/store';
import { cn } from '@/shared/lib/utils';
import Image from 'next/image';

export const CartDrawer: React.FC<React.PropsWithChildren> = ({ children }) => {
  const {
    totalAmount,
    items,
    fetchCartItems,
    updateItemQuantity,
    removeCartItem,
  } = useCartStore();

  React.useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems]);

  const onClickCountButton = (
    id: number,
    quantity: number,
    type: 'plus' | 'minus'
  ) => {
    const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, newQuantity);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="flex flex-col justify-between pb-0 bg-[#F4F1EE] rounded-tl-lg rounded-bl-lg">
        <div
          className={cn(
            'flex flex-col h-full',
            !totalAmount && 'justify-center'
          )}
        >
          {totalAmount > 0 && (
            <SheetHeader>
              <SheetTitle>{getCartHeadString(items.length)}</SheetTitle>
            </SheetHeader>
          )}

          {!totalAmount && (
            <div className="flex flex-col items-center justify-center w-72 mx-auto">
              <Image
                src="/assets/img/empty-box.png"
                alt="Empty cart"
                width={120}
                height={120}
              />
              <div className="text-center font-bold my-2">Корзина порожня</div>
              <SheetClose>
                <div
                  className="min-w-64 h-12 text-base bg-primary flex justify-center items-center rounded-md text-background"
                >
                  <ArrowLeft className="w-5 mr-2" />
                  Повернутись назад
                </div>
              </SheetClose>
            </div>
          )}

          {totalAmount > 0 && (
            <>
              <div className="-mx-6 mt-5 overflow-auto scrollbar flex-1">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="mb-2"
                  >
                    <CartDrawerItem
                      id={item.id}
                      imageUrl={item.imageUrl}
                      disabled={item.disabled}
                      name={item.name}
                      price={item.price}
                      quantity={item.quantity}
                      onClickCountButton={(type) =>
                        onClickCountButton(item.id, item.quantity, type)
                      }
                      onClickRemove={() => removeCartItem(item.id)}
                    />
                  </div>
                ))}
              </div>

              <SheetFooter className="-mx-6 bg-white p-8 rounded-bl-lg">
                <div className="w-full">
                  <div className="flex mb-4">
                    <div className="flex flex-1 text-lg text-neutral-500">
                      Разом
                      <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2"></div>
                    </div>

                    <span className="font-bold text-lg">{totalAmount} грн</span>
                  </div>
                  <Link href="/checkout">
                    <Button
                      type="submit"
                      className="w-full h-12 text-base"
                    >
                      Оформити замовлення
                      <ArrowRight className="w-5 ml-2" />
                    </Button>
                  </Link>
                </div>
              </SheetFooter>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
