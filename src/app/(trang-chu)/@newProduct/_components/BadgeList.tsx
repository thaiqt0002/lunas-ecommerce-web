'use client'
import { FC, useCallback, useMemo } from 'react'

import { TState, useProvider } from './Provider'
import Badge from '../../_components/Badge'

const BadgeList: FC = () => {
  const { state, setState } = useProvider()
  const handleOnClick = useCallback((value: TState) => setState(value), [setState])
  const RenderBadge = useMemo(() => {
    return [
      { name: 'Shounen', value: 'SHOUNEN' },
      { name: 'Seinen', value: 'SEINEN' },
      { name: 'Game', value: 'GAME' },
      { name: 'BG', value: 'BG' },
      { name: 'BL', value: 'BL' },
      { name: 'GL', value: 'GL' },
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
