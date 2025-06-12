'use client'

import React from 'react'
import { AddressSuggestions } from 'react-dadata'
import 'react-dadata/dist/react-dadata.css'

interface Props {
  onChange?: (value?: string) => void
}

export const AddressInput: React.FC<Props> = ({ onChange }) => {
  return (
    <AddressSuggestions
      token="e34c436f2e34d7ce136b9173a268fd1512896434"
      onChange={(data) => onChange?.(data?.value)}
    />
  )
}
