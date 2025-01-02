'use client'
import { FC, useMemo } from 'react'
import { useCookies } from 'react-cookie'
import Button from '@customafk/lunas-ui/Atoms/Button'
import Input from '@customafk/lunas-ui/Atoms/Input'

import { helper } from '@core/libs/helper'

import { IBaseCart } from '@core/types/payment'

import { useSelectedCartUuids } from './Provider'

interface IProps {
  data: IBaseCart[]
}
const Sidebar: FC<IProps> = ({ data }) => {
  const [, setCookie] = useCookies(['draft-bill'])
  const { selectedCartUuids } = useSelectedCartUuids()
  const selectedCartsAmountTotal = useMemo(
    () =>
      data
        .filter(({ uuid }) => selectedCartUuids.includes(uuid))
        .reduce((acc, item) => {
          return acc + item.salePrice * item.quantity
        }, 0),
    [data, selectedCartUuids],
  )
  const draftBill = useMemo(
    () =>
      data
        .filter(({ uuid }) => selectedCartUuids.includes(uuid))
        .map((cart) => ({
          variantUuid: cart.variantUuid,
          quantity: cart.quantity,
          price: cart.salePrice,
          metadata: {
            productName: cart.productName,
            variantName: cart.varianName,
            variantImage: helper.convertImageUrl(cart.variantImage),
          },
        })),
    [data, selectedCartUuids],
  )
  return (
    <div className="relative col-span-1">
      <div className="absolute left-0 top-0 flex w-full flex-col gap-y-4">
        <div className="flex w-full cursor-not-allowed flex-col gap-y-2 rounded-lg bg-ui-surface-50 px-5 py-4 opacity-60 shadow-ui-flat">
          <p className="text-ui-p font-semibold">Mã giảm giá</p>
          <div className="flex gap-x-2">
            <Input
              placeholder="Nhập mã giảm giá"
              className="grow"
              inputClassName="h-7 text-ui-small-note "
            />
            <Button disabled variant="outline" className="h-7 rounded font-semibold">
              Sử dụng
            </Button>
          </div>
        </div>

        <div className="flex w-full flex-col gap-y-3 rounded-lg bg-ui-surface-50 p-5 text-sm text-ui-text-800 shadow-ui-flat">
          <div className="flex justify-between">
            <p className="font-semibold">Tạm tính</p>
            <p className="font-semibold">
              {Intl.NumberFormat('vi-VN').format(selectedCartsAmountTotal)}đ
            </p>
          </div>
          <div className="flex justify-between">
            <p className="font-semibold">Mã giảm giá</p>
            <p className="font-semibold">0đ</p>
          </div>
          <div className="flex justify-between">
            <p className="text-lg font-extrabold">Tổng cộng</p>
            <p className="text-lg font-extrabold text-ui-secondary-500">
              {Intl.NumberFormat('vi-VN').format(selectedCartsAmountTotal)}đ
            </p>
          </div>
        </div>

        <Button
          disabled={selectedCartUuids.length === 0}
          className="px-4 py-2 text-ui-h3 font-bold"
          onClick={() => {
            setCookie('draft-bill', draftBill)
            window.open('https://dev.payment.lunas.vn/thanh-toan', '_blank')
          }}
        >
          Thanh toán
        </Button>
      </div>
    </div>
  )
}

export default Sidebar
