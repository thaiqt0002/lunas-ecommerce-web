import publicServer from '@core/services/server/public'

import ImageList from './_components/ImageList'
import Thumbnail from './_components/Thumbnail'

interface IParams {
  params: Promise<{ slug: string }>
}
export default async function Page({ params }: IParams) {
  const { slug } = await params
  const uuid = slug.split('_')[1]
  const { product } = await publicServer.getProductDetail(uuid)
  const { thumbnail, productImages, variants } = product
  const images = [
    { name: product.name, url: thumbnail },
    ...productImages.map((image) => {
      return { name: `${product.name} ${image.uuid}`, url: image.imageUrl }
    }),
    ...variants.map((variant) => {
      return { name: `${product.name} ${variant.name}`, url: variant.image.imageUrl }
    }),
  ]
  return (
    <div className="flex flex-col gap-y-4">
      <Thumbnail data={images[0]} />
      <ImageList data={images} />
    </div>
  )
}
