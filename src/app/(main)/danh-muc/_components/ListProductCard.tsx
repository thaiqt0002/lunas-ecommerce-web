'use client'
import Image from 'next/image'
import { FC } from 'react'
import Button from '@customafk/lunas-ui/Atoms/Button'
import Money from '@customafk/lunas-ui/Atoms/Money'
import Flex from '@customafk/lunas-ui/Layout/Flex'

import { helper } from '@core/libs/helper'

import cartClientService from '@core/services/clients/cart'

import { IProduct } from '@core/types/product'

import Status from './Status'

interface IProps {
  data: Omit<IProduct, 'description'>
}
const ListProductCard: FC<IProps> = ({ data }) => {
  const { name, thumbnail, status } = data
  const { mutateAsync, isPending } = cartClientService.useCreateCart()
  return (
    <Flex
      gapX="3"
      gapY="4"
      width="full"
      justify="start"
      pb="4"
      className="flex-col items-start border-b border-b-ui-border-300 sm:flex-row"
    >
      <Image
        src={helper.convertImageUrl(thumbnail)}
        loader={({ src }) => `${src}?w=124`}
        alt={name}
        width={124}
        height={124}
        className="aspect-square rounded object-cover object-top shadow-ui-flat"
      />
      <Flex vertical gapY="2" align="start" flexGrow={1} width="full">
        <Flex vertical gapY="1" align="start">
          <p className="line-clamp-2 text-ui-note font-semibold text-ui-text-900 md:text-ui-h3">
            {name}
          </p>
          <Money
            money={data.salePrice}
            iconSize={28}
            className="text-ui-p font-bold text-ui-primary-500 md:!text-ui-h2"
          />
        </Flex>
        <p className="line-clamp-1 !text-ui-small-note text-ui-text-700">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget
        </p>
        <Flex vertical gapY="0" width="full" align="start" className="gap-y-2 sm:gap-y-0">
          <Status status={status as 'PREORDER' | 'ORDER' | 'INSTOCK' | 'OUT_OF_STOCK'} />
          <div className="flex w-full justify-end">
            <Button
              disabled={isPending}
              className="py-2 text-ui-small-note font-semibold sm:px-4 sm:text-ui-note"
              onClick={() => {
                mutateAsync({
                  variantUuid: data.variants[0].uuid,
                  quantity: 1,
                })
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M0 0H1.59681L3.72056 9.9609C3.79847 10.3257 4.00053 10.6518 4.29198 10.8831C4.58343 11.1144 4.94603 11.2364 5.31736 11.2281H13.1257C13.4892 11.2275 13.8415 11.1024 14.1246 10.8735C14.4076 10.6445 14.6045 10.3254 14.6826 9.96892L16 4.01002H2.4511M5.5489 15.198C5.5489 15.6409 5.19144 16 4.7505 16C4.30955 16 3.9521 15.6409 3.9521 15.198C3.9521 14.7551 4.30955 14.396 4.7505 14.396C5.19144 14.396 5.5489 14.7551 5.5489 15.198ZM14.3313 15.198C14.3313 15.6409 13.9739 16 13.5329 16C13.092 16 12.7345 15.6409 12.7345 15.198C12.7345 14.7551 13.092 14.396 13.5329 14.396C13.9739 14.396 14.3313 14.7551 14.3313 15.198Z"
                  stroke="#FAFAFA"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>Thêm vào giỏ hàng</span>
            </Button>
          </div>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default ListProductCard
