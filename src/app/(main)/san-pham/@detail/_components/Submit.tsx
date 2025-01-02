'use client'
import { FC } from 'react'
import { useCookies } from 'react-cookie'
import Button from '@customafk/lunas-ui/Atoms/Button'

import { helper } from '@core/libs/helper'

import cartClientService from '@core/services/clients/cart'

import { useProductContext } from '../../_components/Provider'

import { ShoppingCart } from 'lucide-react'

const Submit: FC<{
  productName?: string
  productSalePrice?: number
}> = ({ productName = '', productSalePrice = 0 }) => {
  const [, setCookie] = useCookies(['draft-bill'])
  const { variantSelected, quantity } = useProductContext()
  const { mutateAsync, isPending } = cartClientService.useCreateCart()
  const draftBillData = !!variantSelected
    ? [
        {
          variantUuid: variantSelected?.uuid,
          quantity: quantity ?? 1,
          price: (variantSelected?.price ?? 0) + productSalePrice,
          metadata: {
            productName,
            variantName: variantSelected?.name,
            variantImage: helper.convertImageUrl(variantSelected?.image.imageUrl ?? ''),
          },
        },
      ]
    : []
  return (
    <div className="flex flex-col gap-y-2 px-2 pt-3 [&>button]:py-2 [&>button]:text-ui-p [&>button]:font-bold">
      <Button
        disabled={!variantSelected || !quantity}
        onClick={() => {
          console.log('draftBillData', draftBillData)
          setCookie('draft-bill', draftBillData, { path: '/' })
          window.open('https://dev.payment.lunas.vn/thanh-toan', '_blank')
        }}
      >
        Mua ngay
      </Button>
      <Button
        variant="outline"
        disabled={isPending}
        onClick={() => {
          mutateAsync({
            variantUuid: variantSelected!.uuid,
            quantity: quantity! ?? 1,
          })
        }}
      >
        <ShoppingCart size={16} />
        Thêm vào giỏ hàng
      </Button>
    </div>
  )
}

export default Submit
