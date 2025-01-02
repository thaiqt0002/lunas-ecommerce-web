'use client'
import { FC } from 'react'
import { Checkbox } from '@customafk/lunas-ui/Atoms/Checkbox'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@customafk/lunas-ui/Atoms/Tabs'

import { cn } from '@core/libs/cn'

import { IBaseCart } from '@core/types/payment'

import CartItem from './CartItem'
import { useSelectedCartUuids } from './Provider'

interface IProps {
  data: IBaseCart[]
}
const CartLists: FC<IProps> = ({ data }) => {
  const { selectedCartUuids, setSelectedCartUuids } = useSelectedCartUuids()
  const orders = data.filter(({ productStatus }) => productStatus === 'ORDER' || 'PREORDER')
  const inStocks = data.filter(({ productStatus }) => productStatus === 'INSTOCK')
  const selectedCartsLength = data.filter(({ uuid }) => selectedCartUuids.includes(uuid)).length
  return (
    <div className="relative col-span-1 md:col-span-2">
      <Tabs defaultValue="ORDER">
        <TabsList
          className={cn(
            'w-full justify-start pb-4',
            'rounded-none border-b-[6px] border-ui-primary-500',
            'bg-transparent',
            'data-[state="inactive"]:[&>button]:text-ui-text-400',
            'data-[state="active"]:[&>button]:bg-transparent',
            'data-[state="active"]:[&>button]:shadow-none',
            'data-[state="active"]:[&>button]:text-ui-text-800',
          )}
        >
          <TabsTrigger value="ORDER">Hàng đặt trước ({orders.length})</TabsTrigger>
          <TabsTrigger value="IN_STOCK">Hàng có sẵn ({inStocks.length})</TabsTrigger>
          <div className="flex w-full grow items-center justify-end gap-x-2 pr-2 text-ui-note">
            <Checkbox
              checked={data.length === selectedCartsLength && selectedCartsLength > 0}
              onClick={() =>
                setSelectedCartUuids(
                  data.length === selectedCartsLength && selectedCartsLength > 0
                    ? []
                    : data.map(({ uuid }) => uuid!),
                )
              }
            />
            <p className="hidden md:flex">Chọn tất cả</p>
          </div>
        </TabsList>
        <TabsContent value="ORDER" className="bg-transparent">
          <div className="flex flex-col gap-y-4">
            {orders.map((item) => (
              <CartItem key={item.uuid} data={item} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="IN_STOCK">
          {inStocks.map((item) => (
            <CartItem key={item.uuid} data={item} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default CartLists
