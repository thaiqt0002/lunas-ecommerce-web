import { IParamsProductList } from '@core/types/product'

import publicAPI from '@core/apis/public'

import { useInfiniteQuery, useQuery } from '@tanstack/react-query'

class PublicClientService {
  private static instance: PublicClientService
  private readonly api
  private readonly getCategoriesKey = 'GET_CATEGORIES'
  private readonly getBrandsKey = 'GET_BRANDS'

  private constructor() {
    this.api = publicAPI
  }

  static getInstance = () => {
    return (
      PublicClientService.instance || (PublicClientService.instance = new PublicClientService())
    )
  }

  public useGetCategories = () => {
    const handleGetCategories = async () => {
      const { data } = await this.api.getCategories()
      return data
    }
    return useQuery({
      queryKey: [this.getCategoriesKey],
      queryFn: handleGetCategories,
      staleTime: Infinity,
    })
  }

  public useGetBrands = () => {
    const handleGetBrands = async () => {
      const { data } = await this.api.getBrands()
      return data
    }
    return useQuery({
      queryKey: [this.getBrandsKey],
      queryFn: handleGetBrands,
      staleTime: Infinity,
    })
  }

  public useGetProductList = (params: IParamsProductList) => {
    const handleGetData = async (params: IParamsProductList) => {
      const { data } = await this.api.getProductList(params)
      return data
    }
    return useInfiniteQuery({
      queryKey: ['GET_PRODUCT_LIST', params],
      queryFn: ({ pageParam }) => handleGetData(pageParam),
      initialPageParam: params,
      getNextPageParam: (data, _, lastPageParam) => {
        if (!data || !data?.metadata) {
          return { ...lastPageParam, page: 1 }
        }
        const { metadata } = data
        return { ...params, page: metadata.currentPage + 1 }
      },
      getPreviousPageParam: (data) => {
        if (!data || !data?.metadata) {
          return null
        }
        const { metadata } = data
        return { ...params, page: metadata.currentPage - 1 }
      },
    })
  }
}

const publicClientService = PublicClientService.getInstance()
export default publicClientService
