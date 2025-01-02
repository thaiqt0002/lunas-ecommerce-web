import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import { AspectRatio } from '@customafk/lunas-ui/Atoms/AspectRatio'

import { helper } from '@core/libs/helper'

interface IProps {
  data: {
    uuid: string
    name: string
    salePrice: number
    thumbnail: string
    tags: {
      id: number
      name: string
    }[]
  }
}
const ProductCart: FC<IProps> = ({ data: { thumbnail, salePrice, name, tags, uuid } }) => {
  return (
    <div className="relative flex flex-col gap-y-4">
      <AspectRatio ratio={1} className="overflow-hidden rounded-br-3xl shadow-ui-flat">
        <Image
          src={helper.convertImageUrl(thumbnail)}
          alt="Product"
          loader={({ src }) => `${src}?w=300&h=300`}
          width={300}
          height={300}
          className="size-full object-cover object-top transition-transform duration-300 hover:scale-110"
        />
      </AspectRatio>
      <Link href={`/san-pham/${helper.convertToSlug(name)}_${uuid}`}>
        <p className="break-all !text-ui-note font-bold text-ui-primary-400 sm:text-ui-p">
          {Intl.NumberFormat('vi-VN').format(salePrice)} VND
        </p>
        <p className="line-clamp-2 break-all text-ui-small-note font-semibold text-ui-text-700 hover:text-ui-text-900 sm:text-ui-note">
          {helper.removeSquareBracket(name)}
        </p>
      </Link>
      {tags.find(({ name }) => name === 'New') && (
        <div className="absolute rounded-br-lg bg-ui-surface-50 px-3 py-2 text-ui-p font-bold text-ui-primary-400 shadow-ui-flat">
          Mới
        </div>
      )}
    </div>
  )
}

export default ProductCart
