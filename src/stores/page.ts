import { StateCreator } from 'zustand'

interface IState {
  categoryPageLayout: 'GRID' | 'LIST'
}
interface IActions {
  setCategoryPageLayout: (layout: 'GRID' | 'LIST') => void
}

export type TPageSlice = IState & IActions

export const createPageSlice: StateCreator<TPageSlice, [['zustand/devtools', never]], []> = (
  set,
) => ({
  categoryPageLayout: 'GRID',
  setCategoryPageLayout: (layout) => set({ categoryPageLayout: layout }),
})
