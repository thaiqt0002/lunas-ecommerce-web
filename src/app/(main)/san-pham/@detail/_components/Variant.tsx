'use client'
import { FC, useCallback, useEffect } from 'react'

import { cn } from '@core/libs/cn'

import { IProductVariant } from '@core/types/product'

import { useProductContext } from '../../_components/Provider'

interface IProps {
  data: IProductVariant[]
}
const Variant: FC<IProps> = ({ data }) => {
  const { variantSelected, setVariantSelected, setImageSelected } = useProductContext()
  useEffect(() => {
    setVariantSelected(data[0])
  }, [data, setVariantSelected])
  const Item = useCallback(
    (props: IProductVariant) => {
      const { uuid, name } = props
      return (
        <button
          className={cn(
            'rounded-full border border-ui-primary-50 px-4 py-1 !text-ui-note font-medium',
            'bg-ui-primary-50 text-ui-primary-500',
            uuid === variantSelected?.uuid &&
              'border border-ui-primary-500 bg-ui-surface-50 text-ui-primary-500',
          )}
          onClick={() => {
            setVariantSelected(props)
            setImageSelected({
              name: props.name,
              url: props.image.imageUrl,
            })
          }}
        >
          {name}
        </button>
      )
    },
    [setImageSelected, setVariantSelected, variantSelected?.uuid],
  )
  return (
    <div className="flex flex-col gap-y-2 px-2 py-3">
      <h3 className="text-ui-h2 font-medium text-ui-primary-500">Phân loại</h3>
      <div className="flex flex-wrap gap-2.5">
        {data.map((variant) => (
          <Item key={variant.uuid} {...variant} />
        ))}
      </div>
    </div>
  )
}

export default Variant
