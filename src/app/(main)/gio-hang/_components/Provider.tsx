'use client'
import { createContext, Dispatch, FC, ReactNode, SetStateAction, useContext, useState } from 'react'

const SelectedCartUuidsContext = createContext<{
  selectedCartUuids: string[]
  setSelectedCartUuids: Dispatch<SetStateAction<string[]>>
} | null>(null)

interface IProps {
  children: ReactNode
}
const CartPageProvider: FC<IProps> = ({ children }) => {
  const [selectedCartUuids, setSelectedCartUuids] = useState<string[]>([])
  return (
    <SelectedCartUuidsContext.Provider
      value={{
        selectedCartUuids,
        setSelectedCartUuids,
      }}
    >
      {children}
    </SelectedCartUuidsContext.Provider>
  )
}

const useSelectedCartUuids = () => {
  const context = useContext(SelectedCartUuidsContext)
  if (!context) {
    throw new Error('useSelectedCartUuids must be used within a SelectedCartUuidsProvider')
  }
  return context
}
export { CartPageProvider, useSelectedCartUuids }
