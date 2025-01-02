'use client'
import { FC, useCallback, useMemo } from 'react'

import { TState, useProvider } from './Provider'
import Badge from '../../_components/Badge'

const BadgeList: FC = () => {
  const { state, setState } = useProvider()
  const handleOnClick = useCallback((value: TState) => setState(value), [setState])
  const RenderBadge = useMemo(() => {
    return [
      { name: 'Theo ngày', value: 'Hot Day' },
      { name: 'Theo tuần', value: 'Hot Week' },
      { name: 'Theo tháng', value: 'Hot Month' },
    ].map(({ name, value }) => (
      <Badge
        key={value}
        name={name}
        isActive={state === value}
        onClick={() => handleOnClick(value as TState)}
      />
    ))
  }, [state, handleOnClick])
  return (
    <div className="flex flex-wrap items-center justify-start gap-1 px-4 md:justify-start md:gap-3">
      {RenderBadge}
    </div>
  )
}

export default BadgeList
