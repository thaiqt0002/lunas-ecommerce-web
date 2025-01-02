export type TStatus = 'PREORDER' | 'ORDER' | 'INSTOCK' | 'OUT_OF_STOCK'
export interface IProductBrand {
  uuid: string
  name: string
}

export interface IProductSeries {
  uuid: string
  name: string
  slug: string
  description: string
  image: string
  productTotal: number
}

export interface IProductCategory {
  uuid: string
  name: string
  slug: string
  description: string
}

export interface IProductTag {
  id: number
  name: string
}

export interface IProductImage {
  uuid: string
  imageUrl: string
}

export interface IProductVariant {
  uuid: string
  name: string
  price: number
  image: {
    id: number
    imageUrl: string
  }
}

export interface IProduct {
  uuid: string
  name: string
  slug: string
  description: string
  salePrice: number
  thumbnail: string
  country: string
  status: string
  priority: number
  preorderStartDate: Date | null
  preorderEndDate: Date | null
  releaseDate: string | null
  createdAt: Date
  updatedAt: Date
  brand: IProductBrand
  series: IProductSeries
  parentCategory: IProductCategory
  subCategory: IProductCategory
  tags: IProductTag[]
  productImages: IProductImage[]
  variants: IProductVariant[]
}

export interface IProductList {
  products: Omit<IProduct, 'description'>[]
  metadata: {
    total: number
    totalPages: number
    perPage: number
    currentPage: number
  }
}

export interface IParamsProductList {
  page?: number
  limit?: number
  search?: string
  brandUuids?: string
  minPrice?: number
  maxPrice?: number
  created?: number
  updated?: number
  price?: number
  parentCategoryUuid?: string
  subCategoryUuid?: string
}
