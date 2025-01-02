import { SERVER_URL } from '@core/constants'

import { IProduct } from '@core/types/product'
import { IPublicCategories, IPublicHomePage } from '@core/types/public'

import { BaseServer } from './base'

class PublicServer extends BaseServer {
  private static instance: PublicServer

  static getInstance = () => {
    return PublicServer.instance || (PublicServer.instance = new PublicServer())
  }

  private readonly publicApiUrl: string = `${SERVER_URL}/public`

  public getCategories = (): Promise<IPublicCategories[]> => {
    return this.request<IPublicCategories[]>(`${this.publicApiUrl}/category`)
  }

  public getHomePage = (): Promise<IPublicHomePage> => {
    return this.request<IPublicHomePage>(`${this.publicApiUrl}/product/homepage`)
  }

  public getProductPageList = (): Promise<{ uuid: string; name: string; slug: string }[]> => {
    return this.request<{ uuid: string; name: string; slug: string }[]>(
      `${this.publicApiUrl}/page/products`,
    )
  }

  public getProductDetail = (uuid: string): Promise<{ product: IProduct }> => {
    return this.request<{ product: IProduct }>(`${this.publicApiUrl}/product/${uuid}`)
  }
}
const publicServer = PublicServer.getInstance()
export default publicServer
