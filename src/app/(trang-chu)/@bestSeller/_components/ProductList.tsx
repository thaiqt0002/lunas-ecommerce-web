'use client'
import { FC, useMemo } from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@customafk/lunas-ui/Atoms/Carousel'

import { cn } from '@core/libs/cn'

import ProductCart from './ProductCard'
import { useProvider } from './Provider'

import AutoPlay from 'embla-carousel-autoplay'

interface IProps {
  data: {
    uuid: string
    name: string
    slug: string
    salePrice: number
    quantity: number
    thumbnail: string
    tags: {
      id: number
      name: string
    }[]
  }[]
}
const ProductList: FC<IProps> = ({ data }) => {
  const { state } = useProvider()
  const products = useMemo(() => {
    switch (state) {
      case 'Hot Day': {
        return data.filter(({ tags }) => tags.find(({ name }) => name === 'Hot Day')) ?? undefined
      }
      case 'Hot Week': {
        return data.filter(({ tags }) => tags.find(({ name }) => name === 'Hot Week')) ?? undefined
      }
      case 'Hot Month': {
        return data.filter(({ tags }) => tags.find(({ name }) => name === 'Hot Month')) ?? undefined
      }
      default:
        return undefined
    }
  }, [data, state])
  return (
    <Carousel
      opts={{
        align: 'start',
        loop: true,
      }}
      plugins={[
        AutoPlay({
          delay: 3000,
        }),
      ]}
      className="w-full px-10 py-3 min-[430px]:px-14 min-[440px]:px-10 sm:px-16"
    >
      <CarouselContent>
        {products?.map((product, index) => (
          <CarouselItem
            key={index}
            className="min-[440px]:basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/4 xl:basis-1/4"
          >
            <ProductCart data={product} />
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselNext
        className={cn(
          'right-4 hidden h-24 w-10 border-none pl-3 pr-2 sm:flex',
          !products?.length && '!hidden',
        )}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="68"
          viewBox="0 0 16 68"
          fill="none"
        >
          <path
            d="M0 53.5195C0 45.9369 3.02464 39.0557 7.94136 34.0002C3.02464 28.9447 0 22.0635 0 14.4809C0 9.68408 1.21041 5.16799 3.34451 1.21722C3.51845 1.03239 3.69383 0.848915 3.87064 0.666832C3.49174 2.72763 3.29383 4.85117 3.29383 7.02059C3.29383 17.8587 8.23371 27.5514 16 34.0002C8.23371 40.449 3.29383 50.1416 3.29383 60.9798C3.29383 63.1492 3.49174 65.2727 3.87064 67.3335C3.69381 67.1514 3.51841 66.9679 3.34447 66.7831C1.21039 62.8323 0 58.3162 0 53.5195Z"
            fill="#BFDBFE"
          />
        </svg>
      </CarouselNext>
      <CarouselPrevious
        disabled={false}
        className={cn(
          'left-4 hidden h-24 w-10 border-none pl-2 pr-3 sm:flex',
          !products?.length && '!hidden',
        )}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="68"
          viewBox="0 0 16 68"
          fill="none"
        >
          <path
            d="M16 53.5195C16 45.9369 12.9754 39.0557 8.05864 34.0002C12.9754 28.9447 16 22.0635 16 14.4809C16 9.68409 14.7896 5.16799 12.6555 1.21722C12.4816 1.03239 12.3062 0.848915 12.1294 0.666832C12.5083 2.72763 12.7062 4.85117 12.7062 7.02059C12.7062 17.8587 7.76629 27.5514 0 34.0002C7.76629 40.449 12.7062 50.1416 12.7062 60.9798C12.7062 63.1492 12.5083 65.2727 12.1294 67.3335C12.3062 67.1514 12.4816 66.9679 12.6555 66.7831C14.7896 62.8323 16 58.3162 16 53.5195Z"
            fill="#BFDBFE"
          />
        </svg>
      </CarouselPrevious>
    </Carousel>
  )
}

export default ProductList
