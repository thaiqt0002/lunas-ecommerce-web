'use client'
import Image from 'next/image'
import { FC, useEffect } from 'react'

import { helper } from '@core/libs/helper'

import { blurDataURL } from '@core/constants/blur'

import { useProductContext } from '../../../_components/Provider'

interface IProps {
  data: { name: string; url: string }
}
const Thumbnail: FC<IProps> = ({ data }) => {
  const { imageSelected, setImageSelected } = useProductContext()
  useEffect(() => {
    setImageSelected(data)
  }, [data, setImageSelected])
  return (
    <div className="overflow-hidden rounded-2xl">
      <Image
        alt={imageSelected.name}
        src={helper.convertImageUrl(imageSelected.url)}
        loader={({ src }) => `${src}?w=544`}
        width={544}
        height={544}
        blurDataURL={blurDataURL}
        className="aspect-square w-full bg-ui-surface-50 object-cover object-top shadow-ui-flat transition-transform duration-300 hover:scale-110"
      />
    </div>
  )
}

export default Thumbnail
