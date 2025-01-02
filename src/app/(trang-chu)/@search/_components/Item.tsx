import Image from 'next/image'
import { FC } from 'react'

import { helper } from '@core/libs/helper'

interface IProps {
  data: {
    uuid: string
    name: string
    slug: string
    thumbnail: string
    salePrice: number
  }
}
const Item: FC<IProps> = ({ data: { name, thumbnail, salePrice } }) => {
  return (
    <div className="flex items-center justify-start gap-x-4 px-3 pb-2 pt-3 hover:bg-black/10">
      <Image
        src={helper.convertImageUrl(thumbnail)}
        loader={({ src }) => `${src}?w=48&h=48`}
        alt={name}
        width={48}
        height={48}
        className="size-12 rounded-full"
      />
      <div className="flex grow justify-between">
        <p className="text-ui-note font-bold text-ui-text-50">{name}</p>
        <p className="text-ui-h3 font-extrabold">
          {Intl.NumberFormat('vi-VN').format(salePrice)} VND
        </p>
      </div>
    </div>
  )
}

export default Item
