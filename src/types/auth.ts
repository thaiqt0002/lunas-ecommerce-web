export type TUserStatus = 'IS_LOGGED' | 'IS_NOT_LOGGED' | 'LOGOUT'

export interface IUser {
  uuid: string
  role: 'USER' | 'ADMIN'
  email: string
  fullname: string
  username: string
  avatar: string
}

export interface IBaseRole {
  id: string
  name: string
}

export interface IBaseBio {
  id: string
  username: string
  fullname: string
  phoneNumber: string
}

export interface IBaseUser {
  id: string
  name: string
  bio: IBaseBio
  role: IBaseRole
}

export interface IGetMeRes extends IUser {}

export interface IVerifyEmailParams {
  token: string
}

export interface IGoogleParams {
  clientId: string
  credential: string
  select_by: string
}

export interface IContactSupportParams {
  topic: string
  content: string
  name: string
  phoneNumber: string
  email: string
}
