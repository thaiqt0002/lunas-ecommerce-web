import { IBaseCart, IGetCartsRes } from '@core/types/payment'

interface IProps {
  data: IGetCartsRes[] | undefined | null
}
const useFormatCart = (props: IProps): IBaseCart[] => {
  if (!props.data) return []
  const { data } = props
  const variants = data
    .map(({ uuid, name, thumbnail, status, slug, salePrice, variants }) => {
      return variants.map(({ cart, ...variant }) => ({
        uuid: cart.uuid,
        quantity: cart.quantity,
        salePrice,
        productUuid: uuid,
        productName: name,
        productThumbnail: thumbnail,
        productSlug: slug,
        productStatus: status,
        variantUuid: variant.uuid,
        varianName: variant.name,
        variantImage: variant.image.imageUrl,
      }))
    })
    .flat()
  return variants
}

export default useFormatCart
