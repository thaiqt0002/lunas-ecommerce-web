import { FC, memo } from 'react'

import { cn } from '@core/libs/cn'

interface IProps {
  title?: string
  children: React.ReactNode
}
const Card: FC<IProps> = ({ title = 'title', children }) => {
  return (
    <div className="relative border-2 border-ui-primary-400 pb-10 pt-8">
      <div className="relative flex h-96 flex-col items-center gap-y-3">
        <h2 className="text-xl font-bold text-ui-text-900 md:text-4xl">{title}</h2>
        {children}
      </div>
      <div className="absolute -left-0.5 -top-0.5 z-10">
        <div
          className={cn(
            'relative size-10',
            'rounded-br-full',
            'bg-ui-surface-50',
            'border-b-2 border-r-2',
            'border-b-ui-primary-400 border-r-ui-primary-400',
          )}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="25"
            viewBox="0 0 24 25"
            fill="none"
            className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2"
          >
            <path
              d="M12.1363 0L15.055 8.98278L24 10.5L15.055 14.5344L12.1363 25L9.21764 14.5344L0 10.5L9.21764 8.98278L12.1363 0Z"
              fill="#6C70F0"
            />
          </svg>
        </div>
      </div>
      <div className="absolute -right-0.5 -top-0.5 z-10">
        <div
          className={cn(
            'relative size-10',
            'rounded-bl-full',
            'bg-ui-surface-50',
            'border-b-2 border-l-2',
            'border-b-ui-primary-400 border-l-ui-primary-400',
          )}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="25"
            viewBox="0 0 24 25"
            fill="none"
            className="absolute right-0 top-0 -translate-y-1/2 translate-x-1/2"
          >
            <path
              d="M12.1363 0L15.055 8.98278L24 10.5L15.055 14.5344L12.1363 25L9.21764 14.5344L0 10.5L9.21764 8.98278L12.1363 0Z"
              fill="#6C70F0"
            />
          </svg>
        </div>
      </div>
      <div className="absolute -bottom-0.5 -right-0.5 z-10">
        <div
          className={cn(
            'relative size-10',
            'rounded-tl-full',
            'bg-ui-surface-50',
            'border-l-2 border-t-2',
            'border-l-ui-primary-400 border-t-ui-primary-400',
          )}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="25"
            viewBox="0 0 24 25"
            fill="none"
            className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2"
          >
            <path
              d="M12.1363 0L15.055 8.98278L24 10.5L15.055 14.5344L12.1363 25L9.21764 14.5344L0 10.5L9.21764 8.98278L12.1363 0Z"
              fill="#6C70F0"
            />
          </svg>
        </div>
      </div>
      <div className="absolute -bottom-0.5 -left-0.5 z-10">
        <div
          className={cn(
            'relative size-10',
            'rounded-tr-full',
            'bg-ui-surface-50',
            'border-r-2 border-t-2',
            'border-r-ui-primary-400 border-t-ui-primary-400',
          )}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="25"
            viewBox="0 0 24 25"
            fill="none"
            className="absolute bottom-0 left-0 -translate-x-1/2 translate-y-1/2"
          >
            <path
              d="M12.1363 0L15.055 8.98278L24 10.5L15.055 14.5344L12.1363 25L9.21764 14.5344L0 10.5L9.21764 8.98278L12.1363 0Z"
              fill="#6C70F0"
            />
          </svg>
        </div>
      </div>
    </div>
  )
}

export default memo(Card)
