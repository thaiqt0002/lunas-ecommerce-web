'use client'
import { FC } from 'react'

import { cn } from '@core/libs/cn'

import { TStatus } from '@core/types/product'

interface IProps {
  status: TStatus
}
const Status: FC<IProps> = ({ status }) => {
  return (
    <div
      className={cn(
        'w-fit rounded-full px-3 py-1 !text-ui-small-note font-semibold text-ui-surface-50 shadow-ui-flat',
        status === 'PREORDER' && 'bg-ui-status-order',
        status === 'ORDER' && 'bg-ui-status-order',
        status === 'INSTOCK' && 'bg-ui-status-in-stock',
        status === 'OUT_OF_STOCK' && 'bg-ui-status-out-of-stock',
      )}
    >
      {status === 'PREORDER' && 'Đang nhận đặt trước'}
      {status === 'ORDER' && 'Đang nhận đặt hàng'}
      {status === 'INSTOCK' && 'Hàng có sẵn'}
      {status === 'OUT_OF_STOCK' && 'Hết hàng'}
    </div>
  )
}

export default Status
