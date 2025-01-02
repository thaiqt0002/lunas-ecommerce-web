'use client'
import { FC } from 'react'

import { cn } from '@core/libs/cn'

import { ISeriesPublicHomePage } from '@core/types/public'

import SeriesItem from './SeriesItem'

interface IProps {
  data: ISeriesPublicHomePage[]
}
const SeriesList: FC<IProps> = ({ data }) => {
  return (
    <div
      className={cn(
        'grid gap-4',
        'grid-cols-2 grid-rows-6',
        'sm:grid-cols-3 sm:grid-rows-4',
        'md:grid-cols-4 md:grid-rows-3',
      )}
    >
      {data.map((item) => (
        <SeriesItem key={item.uuid} data={item} />
      ))}
    </div>
  )
}

export default SeriesList
