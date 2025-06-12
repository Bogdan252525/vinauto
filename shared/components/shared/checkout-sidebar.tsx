import React from 'react'
import { WhiteBlock } from './white-block'
import { ArrowRight } from 'lucide-react'
import { Button, Skeleton } from '../ui'
import { cn } from '@/shared/lib/utils'

const VAT = 15
const DELIVERY_PRICE = 250

interface Props {
  totalAmount: number
  loading?: boolean
  className?: string
}

export const CheckoutSidebar: React.FC<Props> = ({
  totalAmount,
  loading,
  className,
}) => {
  const vatPrice = (totalAmount * VAT) / 100
  const totalPrice = totalAmount + DELIVERY_PRICE + vatPrice

  return (
    <WhiteBlock className={cn('p-6 sticky top-4', className)}>
      <div className="flex flex-col gap-1">
        <span className="text-xl">Разом</span>
        {loading ? (
          <Skeleton className="w-48 h-11" />
        ) : (
          <span className="h-11 text-[34px] font-extrabold">{totalPrice} грн</span>
        )}
      </div>

      <Button
        type="submit"
        className="w-full h-14 rounded-2xl mt-6 text-base font-bold"
      >
        Перейти до оплати
        <ArrowRight className="w-5 ml-2" />
      </Button>
    </WhiteBlock>
  )
}
