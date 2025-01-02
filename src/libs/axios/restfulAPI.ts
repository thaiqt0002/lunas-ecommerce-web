import { API_URL } from '@core/constants'

import { METHOD } from '@core/types/base'

import { AxiosClient } from './axiosClient'

import { AxiosInstance, AxiosResponse } from 'axios'

type TID = string | number

interface IRestfulOptions {
  path?: string
}

export interface IRestfulAPIConfig {
  path: string
  method: METHOD
}

interface IHandleRequest {
  config: IRestfulAPIConfig
  payload?: Record<string, any>
}

/**
 * RestfulAPI class is a base class for all restful API classes
 * It contains all the basic methods for making restful API requests
 * It uses AxiosClient to make the requests
 * @method getRequest - for making GET requests
 * @method getRequestById - for making GET requests by id
 * @method postRequest - for making POST requests
 * @method putRequest - for making PUT requests
 * @method patchRequest - for making PATCH requests
 * @method deleteRequest - for making DELETE requests
 * @example class UserAPI extends RestfulAPI {
 *  path = '/users'
 * }
 * const userAPI = new UserAPI()
 * userAPI.getRequest()
 * userAPI.getRequestById(1)
 * userAPI.postRequest({name: 'John Doe'})
 * userAPI.putRequest(1, {name: 'John Doe'})
 * userAPI.patchRequest(1, {name: 'John Doe'})
 * userAPI.deleteRequest(1)
 */
export class RestfulAPI {
  protected baseURL = API_URL || ''
  protected axiosClient: AxiosInstance
  constructor() {
    this.axiosClient = new AxiosClient(this.baseURL).getAxiosInstance()
  }

  /**
   * getRequest is a method for making GET requests
   * @param params - query parameters
   * @param options - path to the endpoint
   * @returns Promise<T>
   */
  public getRequest = <T>(params = {}, options: IRestfulOptions = {}): Promise<T> => {
    const { path = '' } = options
    return this.handleRequest<T>({
      config: {
        path,
        method: 'GET',
      },
      payload: params,
    })
  }

  /**
   * getRequestById is a method for making GET requests by id
   * @param id - id of the resource
   * @param options - path to the endpoint
   * @returns Promise<T>
   */
  public getRequestById = <T>(id: TID, options: IRestfulOptions = {}): Promise<T> => {
    const { path = '' } = options
    return this.handleRequest<T>({
      config: {
        path: `${path}/${id}`,
        method: 'GET',
      },
    })
  }

  /**
   * postRequest is a method for making POST requests
   * @param body - request body
   * @param options - path to the endpoint
   * @returns Promise<T>
   */
  public postRequest = <T>(body = {}, options: IRestfulOptions = {}): Promise<T> => {
    const { path = '' } = options
    return this.handleRequest<T>({
      config: {
        path,
        method: 'POST',
      },
      payload: body,
    })
  }

  /**
   * putRequest is a method for making PUT requests
   * @param id - id of the resource
   * @param body - request body
   * @param options - path to the endpoint
   * @returns Promise<T>
   */
  public putRequest = <T>(id: TID | null, body = {}, options: IRestfulOptions = {}): Promise<T> => {
    const { path: Path } = this.optionsParser(options)
    const path = id ? `${Path ?? ''}/${id}` : (Path ?? '')
    return this.handleRequest<T>({
      config: {
        path,
        method: 'PUT',
      },
      payload: body,
    })
  }

  /**
   * patchRequest is a method for making PATCH requests
   * @param id - id of the resource
   * @param body - request body
   * @param options - path to the endpoint
   * @returns Promise<T>
   */
  public patchRequest = <T>(
    id: TID | null,
    body = {},
    options: IRestfulOptions = {},
  ): Promise<T> => {
    const { path: Path } = this.optionsParser(options)
    const path = id ? `${Path ?? ''}/${id}` : (Path ?? '')
    return this.handleRequest<T>({
      config: {
        path,
        method: 'PATCH',
      },
      payload: body,
    })
  }

  /**
   * deleteRequest is a method for making DELETE requests
   * @param id - id of the resource
   * @param options - path to the endpoint
   * @returns Promise<T>
   */
  public deleteRequest = <T>(id: TID | null, options: IRestfulOptions = {}): Promise<T> => {
    const { path: Path } = options
    const path = id ? `${Path ?? ''}/${id}` : (Path ?? '')
    return this.handleRequest<T>({
      config: {
        path,
        method: 'DELETE',
      },
    })
  }

  protected onResponse = <T>(response: AxiosResponse): T => {
    return response.data as T
  }

  private handleRequest = async <T>(params: IHandleRequest): Promise<T> => {
    const { config, payload } = params
    switch (config.method) {
      case 'GET':
        return this.onResponse(await this.axiosClient.get(config.path, { params: payload }))
      case 'POST':
        return this.onResponse(await this.axiosClient.post(config.path, payload))
      case 'PUT':
        return this.onResponse(await this.axiosClient.put(config.path, payload))
      case 'PATCH':
        return this.onResponse(await this.axiosClient.patch(config.path, payload))
      case 'DELETE':
        return this.onResponse(await this.axiosClient.delete(config.path, payload))
      default:
        return this.onResponse(await this.axiosClient.get(config.path, { params: payload }))
    }
  }

  private optionsParser = (options: IRestfulOptions): IRestfulOptions => {
    if (!options.path) {
      options.path = this.baseURL
    }
    return options
  }
}
