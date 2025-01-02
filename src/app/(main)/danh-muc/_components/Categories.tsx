'use client'
import { useRouter } from 'next/navigation'
import { FC, ReactNode } from 'react'
import CategoriesPage from '@customafk/lunas-ui/Ecommerce/Categories'

import { useStore } from '@core/libs/zustand'

import publicClientService from '@core/services/clients/public'

interface IProps {
  children?: ReactNode
}
const Categories: FC<IProps> = ({ children }) => {
  const router = useRouter()

  const { data: brands } = publicClientService.useGetBrands()
  const setPageLayout = useStore().use.setCategoryPageLayout()
  return (
    <CategoriesPage
      initialLayout="GRID"
      brandData={brands ?? []}
      onLayoutChange={(layout) => setPageLayout(layout)}
      onFilterConfirm={(filters) => {
        const brandUuids = filters?.brand?.map((brand) => brand.uuid).join(',')
        const created = filters?.sort === 'date-desc' ? 1 : undefined
        const minPrice = filters?.price?.option.from ?? undefined
        const maxPrice = filters?.price?.option.to ?? undefined
        const query: Record<string, string> = {
          ...(brandUuids && { brandUuids }),
          ...(created && { created: created.toString() }),
          ...(minPrice && { minPrice: minPrice.toString() }),
          ...(maxPrice && { maxPrice: maxPrice.toString() }),
        }
        const search = Object.keys(query) ? `?${new URLSearchParams(query).toString()}` : ''
        router.push(`/danh-muc${search}`)
      }}
    >
      {children}
    </CategoriesPage>
  )
}

export default Categories
