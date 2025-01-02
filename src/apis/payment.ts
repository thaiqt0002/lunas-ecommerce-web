import { RestfulAPI } from '@core/libs/axios'

import { IBaseRes } from '@core/types/base'
import { ICreateCartParams, IGetCartsRes } from '@core/types/payment'

class PaymentAPI extends RestfulAPI {
  private readonly prefix = '/payment'

  private static instance: PaymentAPI
  static readonly getInstance = () => {
    return PaymentAPI.instance || (PaymentAPI.instance = new PaymentAPI())
  }

  public getCarts = (): Promise<IBaseRes<IGetCartsRes[]>> => {
    return this.getRequest(
      {},
      {
        path: `${this.prefix}/cart`,
      },
    )
  }

  public createCart = (params: ICreateCartParams): Promise<IBaseRes<null>> => {
    return this.postRequest(params, {
      path: `${this.prefix}/cart`,
    })
  }

  public deleteByUuid = (uuid: string): Promise<IBaseRes<null>> => {
    return this.deleteRequest(uuid, { path: `${this.prefix}/cart` })
  }
}
const paymentAPI = PaymentAPI.getInstance()
export default paymentAPI
