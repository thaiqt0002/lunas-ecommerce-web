import { FC } from 'react'

import { cn } from '@core/libs/cn'

import dayjs from 'dayjs'
import { Diamond } from 'lucide-react'

interface IProps {
  price: string | number
  series: string
  brand: string
  country: string
  releaseDate?: string | null
}
const Detail: FC<IProps> = ({ price, series, brand, country, releaseDate }) => {
  return (
    <div className="flex flex-col gap-y-2 px-2">
      <p className="text-xl font-extrabold text-ui-destructive-500 md:text-4xl">
        {Intl.NumberFormat('vi-VN').format(Number(price))} VND
      </p>
      <ul
        className={cn(
          'flex flex-col gap-y-1',
          '[&>li]:flex [&>li]:w-full [&>li]:items-center [&>li]:justify-between [&>li]:text-ui-text-600',
          '[&>li>div]:flex',
          '[&>li>div]:items-center',
          '[&>li>div]:text-sm',
          '[&>li>div]:text-ui-text-800',
          '[&>li>div]:gap-x-1.5',
          '[&>li_p]:text-sm',
        )}
      >
        <li>
          <div>
            <Diamond size={8} /> <p>Series:</p>
          </div>
          <p>{series}</p>
        </li>
        <li>
          <div>
            <Diamond size={8} /> <p>Hãng sản xuất:</p>
          </div>
          <p>{brand}</p>
        </li>
        <li>
          <div>
            <Diamond size={8} /> <p>Nguồn:</p>
          </div>
          <div>{country}</div>
        </li>
        {releaseDate && (
          <li>
            <div>
              <Diamond size={8} /> <p>Ngày sản xuất: </p>
            </div>
            <div>{dayjs(releaseDate).format('DD/MM/YYYY')}</div>
          </li>
        )}
      </ul>
    </div>
  )
}

export default Detail
