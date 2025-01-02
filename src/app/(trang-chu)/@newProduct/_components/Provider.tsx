'use client'
import { createContext, Dispatch, FC, ReactNode, SetStateAction, useContext, useState } from 'react'

export type TState = 'SHOUNEN' | 'SEINEN' | 'GAME' | 'BG' | 'BL' | 'GL'

const StateContext = createContext<{
  state: TState
  setState: Dispatch<SetStateAction<TState>>
} | null>(null)
const Provider: FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<TState>('SHOUNEN')
  return (
    <StateContext.Provider
      value={{
        state,
        setState,
      }}
    >
      {children}
    </StateContext.Provider>
  )
}

export function useProvider() {
  const context = useContext(StateContext)
  if (!context) {
    throw new Error('useProvider must be used within a Provider')
  }
  return context
}

export default Provider
