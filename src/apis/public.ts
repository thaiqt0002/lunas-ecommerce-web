import { RestfulAPI } from '@core/libs/axios'

import { IBaseRes } from '@core/types/base'
import { IParamsProductList, IProductList } from '@core/types/product'
import { IPublicBrand, IPublicCategories } from '@core/types/public'

class PublicAPI extends RestfulAPI {
  private readonly prefix = '/public'

  private static instance: PublicAPI

  static readonly getInstance = () => {
    return PublicAPI.instance || (PublicAPI.instance = new PublicAPI())
  }

  public getCategories = (): Promise<IBaseRes<IPublicCategories[]>> => {
    const path = `${this.prefix}/category`
    return this.getRequest({}, { path })
  }

  public getBrands = (): Promise<IBaseRes<IPublicBrand[]>> => {
    const path = `${this.prefix}/brand`
    return this.getRequest({}, { path })
  }

  public getProductList = (params: IParamsProductList): Promise<IBaseRes<IProductList>> => {
    const path = `${this.prefix}/product`
    const brandUuids = params?.brandUuids
    return this.getRequest({ ...params, brandUuids }, { path })
  }
}
const publicAPI = PublicAPI.getInstance()
export default publicAPI
