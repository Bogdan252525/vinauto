import React from 'react'
import { WhiteBlock } from '../white-block'
import { FormTextarea } from '../form'
import { NewPostCheckout } from '../new-post-checkout'

interface Props {
  className?: string
}

export const CheckoutAddressForm: React.FC<Props> = ({ className }) => {

  return (
    <WhiteBlock title="3. Адрес доставки" className={className}>
      <div className="flex flex-col gap-5">

        <NewPostCheckout />

        <FormTextarea
          name="comment"
          className="text-base"
          placeholder="Додаткова інформація"
          rows={5}
        />
      </div>
    </WhiteBlock>
  )
}
