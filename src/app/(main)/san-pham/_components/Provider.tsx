'use client'
import { createContext, Dispatch, FC, ReactNode, SetStateAction, useContext, useState } from 'react'

import { IProductVariant } from '@core/types/product'

const ProductContext = createContext<{
  imageSelected: { name: string; url: string }
  setImageSelected: Dispatch<SetStateAction<{ name: string; url: string }>>

  variantSelected?: IProductVariant
  setVariantSelected: Dispatch<SetStateAction<IProductVariant | undefined>>

  quantity?: number
  setQuantity: Dispatch<SetStateAction<number>>
} | null>(null)

const useProductContext = () => {
  const context = useContext(ProductContext)
  if (!context) {
    throw new Error('useProductContext must be used within a ProductProvider')
  }
  return context
}

interface IProps {
  imageSelected: { name: string; url: string }
  children: ReactNode
}

const Provider: FC<IProps> = ({ imageSelected: initial, children }) => {
  const [imageSelected, setImageSelected] = useState<{ name: string; url: string }>(initial)
  const [variantSelected, setVariantSelected] = useState<IProductVariant | undefined>(undefined)
  const [quantity, setQuantity] = useState<number>(1)
  return (
    <ProductContext.Provider
      value={{
        imageSelected,
        setImageSelected,
        variantSelected,
        setVariantSelected,
        quantity,
        setQuantity,
      }}
    >
      {children}
    </ProductContext.Provider>
  )
}

export { Provider, useProductContext }
