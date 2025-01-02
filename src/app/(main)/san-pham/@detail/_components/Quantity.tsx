'use client'
import { FC } from 'react'
import QuantityBtn from '@customafk/lunas-ui/Atoms/QuantityBtn'

import { useProductContext } from '../../_components/Provider'

const Quantity: FC = () => {
  const { quantity, setQuantity } = useProductContext()
  return (
    <div className="flex flex-col gap-y-2 px-2 pb-2 pt-3">
      <h3 className="text-ui-h2 font-medium text-ui-primary-500">Số lượng</h3>
      <QuantityBtn initialValue={quantity} onValueChange={(value) => setQuantity(value)} />
    </div>
  )
}

export default Quantity
