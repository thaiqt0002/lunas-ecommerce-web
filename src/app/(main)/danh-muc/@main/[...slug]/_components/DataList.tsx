'use client'
import { useSearchParams } from 'next/navigation'
import { FC, Fragment } from 'react'
import Button from '@customafk/lunas-ui/Atoms/Button'

import { cn } from '@core/libs/cn'
import { useStore } from '@core/libs/zustand'

import publicClientService from '@core/services/clients/public'

import GridProductCard from '../../../_components/GridProductCard'
import ListProductCard from '../../../_components/ListProductCard'

interface IProps {
  parentUuid?: string
  subUuid?: string
}
const DataList: FC<IProps> = ({ parentUuid, subUuid }) => {
  const search = useSearchParams()
  const brandUuids = search.get('brandUuids') ?? undefined
  const minPrice = search.get('minPrice') ? Number(search.get('minPrice')) : undefined
  const maxPrice = search.get('maxPrice') ? Number(search.get('maxPrice')) : undefined
  const { data, fetchNextPage } = publicClientService.useGetProductList({
    page: 1,
    limit: 12,
    brandUuids,
    minPrice,
    maxPrice,
    parentCategoryUuid: parentUuid,
    subCategoryUuid: subUuid,
  })
  const pageLayout = useStore().use.categoryPageLayout()
  return (
    <section className="flex w-full flex-col items-center gap-y-8 px-8 pb-4 sm:px-16">
      <div
        className={cn(
          pageLayout === 'GRID' && 'grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4',
          pageLayout === 'LIST' && 'flex w-full flex-col gap-8',
        )}
      >
        {data?.pages.map((page) => (
          <Fragment key={page?.metadata.currentPage}>
            {page?.products.map((product) => (
              <Fragment key={product.uuid}>
                {pageLayout === 'GRID' ? (
                  <GridProductCard data={product} />
                ) : (
                  <ListProductCard data={product} />
                )}
              </Fragment>
            ))}
          </Fragment>
        ))}
      </div>
      <Button
        className="mt-12 rounded-full bg-ui-surface-50 px-6 font-bold !text-ui-primary-500 shadow-ui-sd-primary"
        onClick={() => fetchNextPage()}
      >
        Xem thêm
      </Button>
    </section>
  )
}

export default DataList
