'use client'

import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import {
  CheckoutAddressForm,
  CheckoutCart,
  CheckoutPersonalForm,
  CheckoutSidebar,
  Container,
} from '@/shared/components'
import { checkoutFormSchema, CheckoutFormValues } from '@/shared/constants'
import { useCart } from '@/shared/hooks'

export default function CheckoutPage() {
  const { totalAmount, updateItemQuantity, items, removeCartItem, loading } =
    useCart()

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      phone: '',
      // address: '',
      comment: '',
      city: '',
      department: '',
    },
  })

  const onSubmit = (data: CheckoutFormValues) => {
    console.log(data)
  }

  const onClickCountButton = (
    id: number,
    quantity: number,
    type: 'plus' | 'minus'
  ) => {
    const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1
    updateItemQuantity(id, newQuantity)
  }

  return (
    <Container className="mt-10">
      <h1 className="font-extrabold mb-8 text-[36px]">Оформлення замовлення</h1>

      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex gap-10">
            <div className="flex flex-col gap-10 flex-1 mb-20">
              <CheckoutCart
                onClickCountButton={onClickCountButton}
                removeCartItem={removeCartItem}
                items={items}
                loading={loading}
              />

              <CheckoutPersonalForm
                className={loading ? 'opacity-40 pointer-events-none' : ''}
              />

              <CheckoutAddressForm
                className={loading ? 'opacity-40 pointer-events-none' : ''}
              />
              
            </div>
            <div className="w-[400px]">
              <CheckoutSidebar
                totalAmount={totalAmount}
                loading={loading}
              />
            </div>
          </div>
        </form>
      </FormProvider>
    </Container>
  )
}
