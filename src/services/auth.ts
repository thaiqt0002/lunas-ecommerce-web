import { useToast } from '@core/libs/toaster/useToast'
import { useStore } from '@core/libs/zustand'

import { IGoogleParams } from '@core/types/auth'

import authAPI from '@core/apis/auth'

import 'photoswipe/dist/photoswipe.css'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { HttpStatusCode } from 'axios'

class AuthService {
  private static instance: AuthService
  private readonly api
  private readonly getMeKey = 'GET_ME'
  private readonly signOutKey = 'SIGN_OUT'
  private readonly googleKey = 'GOOGLE'

  private constructor() {
    this.api = authAPI
  }

  static getInstance = () => {
    return AuthService.instance || (AuthService.instance = new AuthService())
  }
  public useGetMe = () => {
    const setIsLogged = useStore().use.setIsLogged()
    const { toast } = useToast()
    const onGetMe = async () => {
      const { data, statusCode } = await this.api.getMe()
      if (statusCode === HttpStatusCode.Ok) {
        toast({
          title: 'Đăng nhập thành công',
          description: 'Chào mừng bạn trở lại',
        })
        setIsLogged(true)
      }
      return data
    }
    return useQuery({
      queryKey: [this.getMeKey],
      queryFn: onGetMe,
      refetchOnWindowFocus: false,
    })
  }

  public useSignOut = () => {
    const setIsLogged = useStore().use.setIsLogged()
    const { toast } = useToast()
    const onLogout = async () => {
      const { statusCode } = await this.api.signOut()
      if (statusCode <= HttpStatusCode.BadRequest) {
        toast({
          title: 'Đăng xuất thành công',
          description: 'Hẹn gặp lại bạn',
        })
        setIsLogged(false)
      }
      return { statusCode }
    }
    return useQuery({
      queryKey: [this.signOutKey],
      queryFn: onLogout,
      enabled: false,
    })
  }

  public useGoogle = () => {
    const setIsLogged = useStore().use.setIsLogged()
    const queryClient = useQueryClient()
    const { toast } = useToast()
    const onGoogle = async (params: IGoogleParams) => {
      const { statusCode } = await this.api.google(params)
      if (statusCode === HttpStatusCode.Ok) {
        toast({
          title: 'Đăng nhập thành công',
          description: 'Chào mừng bạn trở lại',
        })
        setIsLogged(true)
      }
      return { statusCode }
    }
    return useMutation({
      mutationKey: [this.googleKey],
      mutationFn: onGoogle,
      onSuccess: ({ statusCode }) => {
        if (statusCode < HttpStatusCode.BadRequest) {
          queryClient.invalidateQueries({
            queryKey: [this.getMeKey],
          })
        }
      },
    })
  }

  public useContactSupport = () => {
    const { toast } = useToast()
    return useMutation({
      mutationKey: ['CONTACT_SUPPORT'],
      mutationFn: this.api.contactSupport,
      onSuccess: ({ statusCode, error }) => {
        if (statusCode < HttpStatusCode.BadRequest) {
          toast({
            title: 'Gửi yêu cầu thành công',
            description: 'Chúng tôi sẽ phản hồi bạn sớm nhất có thể',
          })
        } else {
          toast({
            title: 'Gửi yêu cầu thất bại',
            description: error?.desc,
          })
        }
      },
    })
  }
}

const authService = AuthService.getInstance()
export default authService
