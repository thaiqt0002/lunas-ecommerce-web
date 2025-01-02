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
  }[]
}
const Content: FC<IProps> = ({ data }) => {
  const router = useRouter()
  return (
    <div className="flex flex-col justify-between gap-y-2">
      <div className="flex flex-col gap-y-0 sm:px-3">
        <h2 className="text-end text-xl font-bold text-ui-text-800 sm:text-4xl">
          Figure mới ra lò
        </h2>
        <p className="text-end text-ui-small-note text-ui-text-600 sm:text-ui-note">
          Cùng xem những mẫu figure mới nhất được ra mắt nhé
        </p>
      </div>
      <div className="grid grid-cols-2 grid-rows-2 gap-4">
        {data.map((item, index) => (
          <AspectRatio
            key={index}
            ratio={1 / 1}
            className="group/image relative cursor-pointer overflow-hidden rounded-md shadow-ui-flat"
            onClick={() => {
              router.push(`/san-pham/${helper.convertToSlug(item.name)}_${item.uuid}`)
            }}
          >
            <Image
              src={helper.convertImageUrl(item.thumbnail)}
              alt={item.name}
              loader={({ src }) => `${src}?w=160&h=160`}
              width={160}
              height={160}
              className="size-full cursor-pointer object-cover object-top transition-transform duration-300 group-hover/image:scale-110"
              loading="lazy"
            />
            <div className="absolute top-0 flex size-full items-center justify-end bg-black/10 opacity-0 transition-all duration-300 group-hover/image:opacity-100" />
          </AspectRatio>
        ))}
      </div>
    </div>
  )
}

export default Content
