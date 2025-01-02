'use client'
import { FC } from 'react'

import { cn } from '@core/libs/cn'

interface IProps {
  status: 'PREORDER' | 'ORDER' | 'INSTOCK' | 'OUT_OF_STOCK'
}
const Status: FC<IProps> = ({ status }) => {
  return (
    <div
      className={cn(
        'rounded-none px-3 py-1 !text-ui-small-note !font-bold text-ui-text-50',
        status === 'PREORDER' && 'bg-ui-status-order',
        status === 'ORDER' && 'bg-ui-status-order',
        status === 'INSTOCK' && 'bg-ui-status-in-stock',
        status === 'OUT_OF_STOCK' && 'bg-ui-status-out-of-stock',
      )}
    >
      {status === 'PREORDER' && 'PREORDER'}
      {status === 'ORDER' && 'ORDER'}
      {status === 'INSTOCK' && 'IN STOCK'}
      {status === 'OUT_OF_STOCK' && 'SOLD OUT'}
    </div>
  )
}

export default Status
