import Image from 'next/image'
import { Dispatch, SetStateAction, useCallback, useLayoutEffect, useState } from 'react'

import { cn } from '@core/libs/cn'

interface IImgProps {
  /**
   * The source of the image
   * @type {string}
   */
  src: string
  /**
   * The alternative text of the image
   * @type {string}
   */
  alt: string
  /**
   * The width of the image
   * @type {number}
   * @default 100
   */
  width?: number
  /**
   * The height of the image
   * @type {number}
   * @default 100
   */
  height?: number
  /**
   * The quality of the image
   * @type {number}
   * @default 75
   */
  quality?: number
  /**
   * The priority of the image
   * @type {boolean}
   * @default false
   */
  priority?: boolean
  /**
   * The class name of the image
   * @type {string}
   * @default ''
   */
  className?: string

  onClick?: () => void
}

const Img = ({ priority = false, className, src, alt, width, height, onClick }: IImgProps) => {
  const [imgSrc, setImgSrc] = useState<string>(src ?? '')

  const imageLoader = useCallback(({ src }: { src: string }) => src, [])

  const handleError = useCallback(
    (setImgSrc: Dispatch<SetStateAction<string>>) => () => {
      setImgSrc('/images/placeholder.svg')
    },
    [],
  )

  useLayoutEffect(() => {
    setImgSrc(src)
  }, [src])

  const blurDataURL =
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9IiNFMEUwRTAiLz48L3N2Zz4='

  return (
    <Image
      src={imgSrc}
      alt={alt}
      width={width ?? 100}
      height={height ?? 100}
      placeholder="blur"
      blurDataURL={blurDataURL}
      loader={imageLoader}
      priority={priority}
      onError={handleError(setImgSrc)}
      className={cn('size-fit object-cover', className)}
      onClick={onClick}
    />
  )
}

export default Img
