'use client'
import Image from 'next/image'
import Link from 'next/link'
import { FC, useCallback, useEffect, useState } from 'react'
import { Checkbox } from '@customafk/lunas-ui/Atoms/Checkbox'
import Money from '@customafk/lunas-ui/Atoms/Money'
import QuantityBtn from '@customafk/lunas-ui/Atoms/QuantityBtn'
import XButton from '@customafk/lunas-ui/Atoms/XButton'

import { cn } from '@core/libs/cn'
import { helper } from '@core/libs/helper'

import cartClientService from '@core/services/clients/cart'

import { IBaseCart } from '@core/types/payment'
import { TStatus } from '@core/types/product'

import { useSelectedCartUuids } from './Provider'
import Status from './Status'

import { SquareArrowUpRight } from 'lucide-react'

interface IProps {
  data: IBaseCart
}
const CartItem: FC<IProps> = ({ data }) => {
  const {
    uuid,
    productThumbnail,
    productName,
    productUuid,
    productSlug,
    varianName,
    variantUuid,
    productStatus,
    quantity,
    salePrice,
  } = data
  const { mutateAsync, isPending } = cartClientService.useCreateCart()
  const { mutateAsync: deleteCart, isPending: isDeleteCartPending } = cartClientService.deleteCart()

  const { selectedCartUuids, setSelectedCartUuids } = useSelectedCartUuids()

  const [quantityVal, setQuantityValue] = useState<number>(quantity)

  const handleSelectCart = useCallback(() => {
    setSelectedCartUuids(
      selectedCartUuids.includes(uuid!)
        ? selectedCartUuids.filter((item) => item !== uuid)
        : [...selectedCartUuids, uuid!],
    )
  }, [selectedCartUuids, setSelectedCartUuids, uuid])

  useEffect(() => {
    if (quantityVal === quantity) return
    const handler = setTimeout(async () => {
      await mutateAsync({
        variantUuid,
        quantity: quantityVal,
      })
    }, 500)
    return () => {
      clearTimeout(handler)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quantityVal])
  return (
    <div
      className={cn(
        'flex flex-col gap-x-3 gap-y-2 rounded bg-ui-surface-50 px-3 pb-4 shadow-ui-flat',
        (isDeleteCartPending || isPending) &&
          'pointer-events-none animate-pulse opacity-50 shadow-none',
      )}
    >
      <div className="mt-2 flex items-center justify-between p-2">
        <Checkbox
          checked={selectedCartUuids.includes(uuid!)}
          className="border-ui-border-400"
          onClick={handleSelectCart}
        />
        <XButton isDisabled={isDeleteCartPending} onClick={() => deleteCart(uuid!)} />
      </div>
      <div className="flex gap-x-4 px-2 pb-1">
        <Image
          src={helper.convertImageUrl(productThumbnail)}
          alt={productName}
          loader={({ src }) => `${src}?w=108`}
          width={108}
          height={108}
          className="aspect-square size-[6.75rem] rounded object-contain shadow-ui-flat"
        />
        <div className="flex flex-col gap-y-1">
          <p className="line-clamp-2 break-all text-ui-note font-semibold text-ui-text-800 md:text-ui-p">
            {productName}
          </p>
          <div className="w-fit rounded bg-ui-secondary-50 px-3 pb-1.5 pt-1 text-ui-small-note font-medium text-ui-secondary-500">
            {varianName}
          </div>
          <div className="flex justify-end">
            <Status status={productStatus as TStatus} />
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        <QuantityBtn
          initialValue={quantityVal}
          onValueChange={(value) => setQuantityValue(value)}
        />
        <Money iconSize={28} money={quantity * salePrice} />
      </div>
      <Link
        href={`/san-pham/${productSlug}_${productUuid}`}
        className="flex justify-center gap-x-2 text-ui-small-note font-medium text-ui-secondary-400 hover:text-ui-secondary-500"
        target="_blank"
      >
        <p>Xem chi tiết sản phẩm</p>
        <SquareArrowUpRight size={16} />
      </Link>
    </div>
  )
}

export default CartItem
