'use client'
import Image from 'next/image'
import { FC } from 'react'
import { AspectRatio } from '@customafk/lunas-ui/Atoms/AspectRatio'

import { helper } from '@core/libs/helper'

import { ISeriesPublicHomePage } from '@core/types/public'

interface IProps {
  data: ISeriesPublicHomePage
}
const SeriesItem: FC<IProps> = ({ data: { name, image } }) => {
  return (
    <div className="flex flex-col items-center gap-y-3">
      <AspectRatio ratio={1}>
        <Image
          src={helper.convertImageUrl(image)}
          alt={name}
          loader={({ src }) => `${src}?w=144&h=144`}
          width={144}
          height={144}
          className="size-full rounded-full border border-ui-border-300 bg-ui-surface-50 object-contain"
        />
      </AspectRatio>
      <p className="text-center text-ui-small-note font-medium">{name}</p>
    </div>
  )
}

export default SeriesItem
