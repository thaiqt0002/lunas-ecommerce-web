export interface IGetCartsRes {
  uuid: string
  name: string
  slug: string
  salePrice: number
  thumbnail: string
  status: string
  variants: {
    uuid: string
    name: string
    price: number
    image: {
      id: number
      imageUrl: string
    }
    cart: {
      uuid: string
      quantity: number
      createdAt: Date
    }
  }[]
}
export interface ICreateCartParams {
  variantUuid: string
  quantity: number
}
export interface IBaseCart {
  uuid: string
  quantity: number
  salePrice: number
  productUuid: string
  productName: string
  productThumbnail: string
  productStatus: string
  productSlug: string
  variantUuid: string
  varianName: string
  variantImage: string
}
