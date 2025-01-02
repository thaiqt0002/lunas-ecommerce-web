'use client'
import { ChangeEvent, FC, useEffect, useRef, useState } from 'react'
import { Lucide2SearchIcon } from '@customafk/lunas-ui/Icons'

import { cn } from '@core/libs/cn'
import { helper } from '@core/libs/helper'

import { useDebounce } from '@core/hooks'

import Item from './Item'
import { ProductMockData } from '../_mockdata'

const SearchInput: FC = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const [inputValue, setInputValue] = useState<string>('')
  const [products, setProducts] = useState<typeof ProductMockData>([])

  const debouncedValue = useDebounce(inputValue, 500)

  const handleInputFocus = () => menuRef.current?.setAttribute('data-active', 'true')
  const handleInputBlur = () => menuRef.current?.setAttribute('data-active', 'false')
  const handleInputChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) =>
    setInputValue(value)

  useEffect(() => {
    const fetchProducts = async () => {
      await helper.sleep(1000)
      setProducts(ProductMockData.filter((item) => item.name.includes(debouncedValue)))
    }
    fetchProducts()
  }, [debouncedValue])
  return (
    <div className="relative h-fit">
      <input
        ref={inputRef}
        placeholder="Tìm kiếm ở đây"
        className="rounded-xl bg-ui-surface-50/60 py-3 pl-5 pr-[3.75rem] outline-none"
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        onChange={handleInputChange}
      />
      <Lucide2SearchIcon
        className="absolute right-4 top-1/2 -translate-y-1/2"
        color="#18181B"
        size={24}
      />
      <div
        ref={menuRef}
        data-active="false"
        className={cn(
          'absolute top-[calc(100%_+_0.75rem)] z-50 overflow-hidden rounded-md',
          'flex flex-col gap-y-0',
          'w-full',
          'opacity-100',
          'bg-black/60 text-ui-text-50',
          'data-[active=false]:h-0',
          'data-[active=false]:opacity-0',
          'transition-all duration-300',
        )}
      >
        {products.map((item) => (
          <Item key={item.uuid} data={item} />
        ))}
        <div className="flex items-center justify-center gap-x-1 py-2 text-ui-note">
          <Lucide2SearchIcon color="#FFFFFF" size={24} />
          <p>Tìm kiếm thêm nhiều sản phẩm</p>
        </div>
      </div>
    </div>
  )
}

export default SearchInput
