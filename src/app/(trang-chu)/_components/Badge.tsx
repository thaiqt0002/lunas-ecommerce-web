import { FC, memo } from 'react'

import { cn } from '@core/libs/cn'

interface IProps {
  name?: string
  isActive?: boolean
  onClick?: () => void
}
const Badge: FC<IProps> = ({ name = 'tag', isActive = false, onClick }) => {
  return (
    <button
      data-active={isActive}
      className={cn(
        'max-h-7',
        '!text-ui-small-note',
        'flex items-center justify-center',
        'px-3 py-1',
        'rounded-3xl border border-ui-primary-default',
        'font-semibold text-ui-primary-500',
        'md:text-ui-p',
        'data-[active=true]:bg-ui-primary-500',
        'data-[active=true]:text-ui-surface-50',
      )}
      onClick={onClick}
    >
      {name}
    </button>
  )
}

export default memo(Badge)
