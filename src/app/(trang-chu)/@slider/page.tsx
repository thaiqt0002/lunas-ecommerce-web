'use client'
import Image from 'next/image'
import { AspectRatio } from '@customafk/lunas-ui/Atoms/AspectRatio'
export default function Page() {
  return (
    <AspectRatio ratio={16 / 9}>
      <Image
        alt="slider"
        src="https://dev.image.lunas.vn/slider.jpeg"
        loader={({ src }) => src}
        layout="fill"
        className="object-fill"
      />
    </AspectRatio>
  )
}
