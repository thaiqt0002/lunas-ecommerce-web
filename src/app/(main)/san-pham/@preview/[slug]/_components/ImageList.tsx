'use client'
import Image from 'next/image'
import { FC } from 'react'
import { AspectRatio } from '@customafk/lunas-ui/Atoms/AspectRatio'
import { Carousel, CarouselContent, CarouselItem } from '@customafk/lunas-ui/Atoms/Carousel'

import { cn } from '@core/libs/cn'
import { helper } from '@core/libs/helper'

import { blurDataURL } from '@core/constants/blur'

import { useProductContext } from '../../../_components/Provider'

import Autoplay from 'embla-carousel-autoplay'

interface IProps {
  data: {
    name: string
    url: string
  }[]
}
const ImageList: FC<IProps> = ({ data }) => {
  const { imageSelected, setImageSelected } = useProductContext()
  return (
    <Carousel
      opts={{
        align: 'start',
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 3000,
        }),
      ]}
    >
      <CarouselContent className="snap-start">
        {data.map((image, index) => (
          <CarouselItem key={index} className="basis-1/4">
            <AspectRatio ratio={1} className="overflow-hidden rounded-lg">
              <Image
                src={helper.convertImageUrl(image.url)}
                alt={image.name}
                loader={({ src }) => `${src}?w=112`}
                width={112}
                height={112}
                className={cn(
                  'size-full cursor-pointer select-none rounded-lg bg-ui-surface-50 object-cover object-top shadow-ui-flat',
                  'transition-transform duration-300 hover:scale-110',
                  imageSelected.url === image.url &&
                    'border-2 border-ui-primary-300 shadow-ui-dialog',
                )}
                onClick={() => setImageSelected(image)}
                loading="lazy"
                blurDataURL={blurDataURL}
              />
            </AspectRatio>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}

export default ImageList
