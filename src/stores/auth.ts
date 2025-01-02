import { StateCreator } from 'zustand'

import { IUser } from '@core/types/auth'

interface IState {
  user: IUser | null
  userIsFetching: boolean

  isLogged: boolean
}

interface IActions {
  setUser: (user: IState['user']) => void
  setUserIsFetching: (isFetching: boolean) => void

  setIsLogged: (isLogged: boolean) => void
}

export type TCreateAuthSlice = IState & IActions

export const createAuthSlice: StateCreator<TCreateAuthSlice, [['zustand/devtools', never]], []> = (
  set,
) => ({
  user: null,
  setUser: (user) => set({ user }),

  userIsFetching: false,
  setUserIsFetching: (isFetching) => set({ userIsFetching: isFetching }),

  isLogged: false,
  setIsLogged: (isLogged) => set({ isLogged }),
})
