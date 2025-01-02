export interface IProductPublicHomePage {
  uuid: string
  name: string
  slug: string
  salePrice: number
  quantity: number
  thumbnail: string
}

export interface ISeriesPublicHomePage {
  uuid: string
  name: string
  slug: string
  description: string
  image: string
  productTotal: number
}

export interface IPublicCategories {
  uuid: string
  name: string
  slug: string
  description: string
  sub: {
    uuid: string
    name: string
    slug: string
    description: string
  }[]
}

export interface INewProduct {
  tag: {
    id: number
    name: string
  }
  productList: {
    uuid: string
    name: string
    salePrice: number
    thumbnail: string
    tags: {
      id: number
      name: string
    }[]
  }[]
}
export interface ISeriesNewVersionProduct {
  uuid: string
  name: string
  slug: string
  description: string
  image: string
  productTotal: number
  createdAt: string
  updatedAt: string
}
export interface IProductNewVersionProduct {
  uuid: string
  name: string
  slug: string
  salePrice: number
  thumbnail: string
  createdAt: string
  variants: {
    uuid: string
    name: string
    fee: number
    price: number
    image: {
      id: number
      imageUrl: string
    }
  }[]
  tags: {
    id: number
    name: string
  }[]
}

export interface INewVersionProduct {
  series: ISeriesNewVersionProduct
  product: IProductNewVersionProduct[]
}

export interface IPublicHomePage {
  newProduct: INewProduct[]
  bestSeller: {
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
  newFigure: {
    uuid: string
    name: string
    slug: string
    salePrice: number
    quantity: number
    thumbnail: string
    createdAt: string
  }[]
  bestSeries: ISeriesPublicHomePage[]
  gsc: {
    uuid: string
    name: string
    slug: string
    salePrice: number
    quantity: number
    thumbnail: string
    createdAt: string
  }[]
  newVersionProduct: INewVersionProduct[]
}

export interface IPublicBrand {
  uuid: string
  name: string
}
