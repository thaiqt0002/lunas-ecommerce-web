'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { FC } from 'react'
import { AspectRatio } from '@customafk/lunas-ui/Atoms/AspectRatio'

import { helper } from '@core/libs/helper'

interface IProps {
  data: {
    uuid: string
    name: string
    slug: string
    salePrice: number
    quantity: number
    thumbnail: string
    createdAt: string
  }
}
const MainItem: FC<IProps> = ({ data: { uuid, name, thumbnail } }) => {
  const router = useRouter()
  return (
    <AspectRatio
      ratio={1}
      className="group/image relative cursor-pointer overflow-hidden rounded-xl"
      onClick={() => {
        router.push(`/san-pham/${helper.convertToSlug(name)}_${uuid}`)
      }}
    >
      <Image
        src={helper.convertImageUrl(thumbnail)}
        width={448}
        height={448}
        loader={({ src }) => src}
        alt={name}
        loading="lazy"
        className="size-full cursor-pointer object-cover shadow-ui-flat transition-transform duration-300 group-hover/image:scale-110"
      />
      <div className="absolute top-0 flex size-full items-center justify-end bg-black/10 opacity-0 transition-all duration-300 group-hover/image:opacity-100" />
    </AspectRatio>
  )
}

export default MainItem
