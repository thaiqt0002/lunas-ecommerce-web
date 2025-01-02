'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FC, useEffect, useState } from 'react'
import SmallQuantityBtn from '@customafk/lunas-ui/Atoms/SmallQuantityBtn'

import { helper } from '@core/libs/helper'

import cartClientService from '@core/services/clients/cart'

import { IBaseCart } from '@core/types/payment'

interface IProps {
  data: IBaseCart
}
const CartItem: FC<IProps> = ({
  data: {
    productThumbnail,
    productName,
    variantUuid,
    varianName,
    quantity,
    salePrice,
    productUuid,
  },
}) => {
  const router = useRouter()
  const { mutateAsync } = cartClientService.useCreateCart()
  const [quantityValue, setQuantityValue] = useState<number>(quantity)
  useEffect(() => {
    if (quantityValue === quantity) return
    const handler = setTimeout(async () => {
      await mutateAsync({
        variantUuid,
        quantity: quantityValue,
      })
    }, 500)
    return () => {
      clearTimeout(handler)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quantityValue])

  return (
    <div className="flex items-start gap-x-3 py-2">
      <Image
        src={helper.convertImageUrl(productThumbnail)}
        loader={({ src }) => `${src}?w=60&h=60`}
        alt={productName}
        height={60}
        width={60}
        className="mt-1 size-[3.75rem] min-w-[3.75rem] rounded object-cover object-top shadow-ui-flat"
      />
      <div className="flex flex-col gap-y-2">
        <div className="flex flex-col items-start gap-y-1">
          <Link href={`/san-pham/${helper.convertToSlug(productName)}_${productUuid}`}>
            <p className="line-clamp-2 text-sm font-semibold text-ui-text-800">{productName}</p>
          </Link>
          <p className="text-ui-small-note font-light text-ui-text-500">Phân loại: {varianName}</p>
        </div>
        <div className="flex justify-between">
          <SmallQuantityBtn
            value={quantityValue}
            onValueChange={(value) => {
              setQuantityValue(value)
            }}
          />
          <p className="text-ui-p font-medium text-ui-primary-500">
            {Intl.NumberFormat('vi-VN').format(salePrice * quantity)} VND
          </p>
        </div>
      </div>
    </div>
  )
}

export default CartItem
