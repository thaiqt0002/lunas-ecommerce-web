'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { FC } from 'react'
import { AspectRatio } from '@customafk/lunas-ui/Atoms/AspectRatio'
import Money from '@customafk/lunas-ui/Atoms/Money'

import { helper } from '@core/libs/helper'

import cartClientService from '@core/services/clients/cart'

import { IProduct } from '@core/types/product'

interface IProps {
  data: Omit<IProduct, 'description'>
}
const GridProductCard: FC<IProps> = ({ data }) => {
  const { name, thumbnail, slug, uuid } = data
  const { mutateAsync, isPending } = cartClientService.useCreateCart()
  const router = useRouter()
  return (
    <div
      className="flex max-w-56 flex-col items-end gap-y-3 hover:cursor-pointer"
      onClick={() => router.push(`/san-pham/${slug}_${uuid}`)}
    >
      <div className="flex flex-col gap-y-2">
        <div className="group/image relative aspect-square rounded bg-ui-surface-100 shadow-ui-flat">
          <AspectRatio ratio={1}>
            <Image
              src={helper.convertImageUrl(thumbnail)}
              alt={name}
              loader={({ src }) => `${src}?w=224`}
              height={224}
              width={224}
              className="size-full object-cover object-top"
            />
          </AspectRatio>
          <div className="absolute top-0 hidden size-full flex-col items-center justify-end bg-black/20 transition-all duration-300 group-hover/image:flex">
            <button
              disabled={isPending}
              className="mb-4"
              onClick={(e) => {
                e.stopPropagation()
                mutateAsync({
                  variantUuid: data.variants[0].uuid,
                  quantity: 1,
                })
              }}
            >
              <Image src="/images/active-cart.svg" alt="heart" width={48} height={48} />
            </button>
          </div>
        </div>
        <p className="line-clamp-2 break-all text-ui-small-note font-medium text-ui-text-900 md:text-ui-note">
          {name}
        </p>
      </div>
      <Money money={data.salePrice} className="!text-ui-note text-ui-primary-500 md:!text-ui-p" />
    </div>
  )
}

export default GridProductCard
