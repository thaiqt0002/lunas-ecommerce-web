import { RestfulAPI } from '@core/libs/axios'

import { IContactSupportParams, IGetMeRes, IGoogleParams } from '@core/types/auth'
import { IBaseRes } from '@core/types/base'

class AuthAPI extends RestfulAPI {
  private readonly prefix = '/auth'

  private static instance: AuthAPI

  static readonly getInstance = () => {
    return AuthAPI.instance || (AuthAPI.instance = new AuthAPI())
  }

  public getMe = (): Promise<IBaseRes<IGetMeRes>> => {
    const path = `${this.prefix}/me`
    return this.getRequest({}, { path })
  }

  public signOut = (): Promise<IBaseRes<null>> => {
    const path = `${this.prefix}/sign-out`
    return this.deleteRequest(null, { path })
  }

  public google = (params: IGoogleParams): Promise<IBaseRes<null>> => {
    const path = `${this.prefix}/google`
    return this.postRequest(params, { path })
  }

  public contactSupport = (params: IContactSupportParams): Promise<IBaseRes<null>> => {
    const path = `${this.prefix}/contacts/users`
    return this.postRequest(params, { path })
  }
}

const authAPI = AuthAPI.getInstance()
export default authAPI
