'use client'
import { FC } from 'react'

import { cn } from '@core/libs/cn'

import { TStatus } from '@core/types/product'

interface IProps {
  status: TStatus
}
const Status: FC<IProps> = ({ status }) => {
  return (
    <div className="flex w-full items-center justify-between">
      <p className="text-ui-note font-medium text-ui-text-500">
        {status === 'PREORDER' && 'Sản phẩm Pre-Order'}
        {status === 'ORDER' && 'Sản phẩm Order'}
        {status === 'INSTOCK' && 'Sản phẩm có sẵn'}
        {status === 'OUT_OF_STOCK' && 'Sản phẩm hiện không có sẵn'}
      </p>
      <div
        className={cn(
          'rounded-full px-3 py-1 !text-ui-small-note font-semibold text-ui-surface-50 md:text-ui-p',
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
    </div>
  )
}

export default Status
