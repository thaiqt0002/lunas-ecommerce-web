'use client'

import Image from 'next/image'
import { FC } from 'react'

import { helper } from '@core/libs/helper'

interface IProps {
  data: {
    seriesName: string
    products: {
      uuid: string
      name: string
      salePrice: number
      thumbnail: string
    }[]
  }
}
const Card: FC<IProps> = ({ data }) => {
  const { seriesName, products } = data
  if (!products.length) return null
  return (
    <div className="flex flex-col gap-y-2.5">
      <Image
        src={helper.convertImageUrl(products[0].thumbnail)}
        alt={seriesName}
        loader={({ src }) => `${src}?w=220`}
        width={220}
        height={220}
        className="aspect-square rounded-2xl bg-ui-surface-100 object-contain"
      />
      <p className="text-ui-small-note font-bold text-ui-surface-50">{seriesName} - Ver mới</p>
      <div className="flex w-full justify-start gap-x-3">
        {products
          .filter((_, index) => index > 0)
          .map((product) => (
            <Image
              key={product.uuid}
              src={helper.convertImageUrl(product.thumbnail)}
              alt={product.name}
              loader={({ src }) => `${src}?w=44`}
              width={44}
              height={44}
              className="aspect-square rounded bg-ui-surface-100 object-contain"
            />
          ))}
      </div>
    </div>
  )
}

export default Card
