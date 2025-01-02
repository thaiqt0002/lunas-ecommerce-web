import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

import { createAuthSlice, TCreateAuthSlice } from './auth'
import { createPageSlice, TPageSlice } from './page'

export const createStore = create<TCreateAuthSlice & TPageSlice>()(
  devtools((...args) => ({
    ...createAuthSlice(...args),
    ...createPageSlice(...args),
  })),
)

export type TCreateStore = typeof createStore
