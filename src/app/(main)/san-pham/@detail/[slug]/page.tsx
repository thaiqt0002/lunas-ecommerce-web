import publicServer from '@core/services/server/public'

import { TStatus } from '@core/types/product'

import Status from '@core/components/ui/Status'

import Detail from '../_components/Detail'
import Quantity from '../_components/Quantity'
import Submit from '../_components/Submit'
import Variant from '../_components/Variant'

interface IParams {
  params: Promise<{ slug: string }>
}
export default async function Page({ params }: IParams) {
  const { slug } = await params
  const uuid = slug.split('_')[1]
  const { product } = await publicServer.getProductDetail(uuid)
  return (
    <div className="flex w-full flex-col gap-y-3 rounded-3xl bg-ui-surface-50 p-8 shadow-ui-flat">
      <h1 className="text-ui-p font-bold text-ui-text-900 md:text-ui-h1">{product.name}</h1>
      <Status status={product.status as TStatus} />
      <Detail
        price={product.salePrice}
        series={product.series.name}
        brand={product.brand.name}
        country={product.country}
        releaseDate={product.releaseDate}
      />
      <Variant data={product.variants} />
      {product.status === 'OUT_OF_STOCK' ? (
        <div className="flex grow flex-col items-center justify-center gap-y-0 font-medium">
          <p className="text-lg">Sản phẩm hiện không khả dụng</p>
          <p className="text-ui-note text-ui-text-500">( Có thể mua lại khi có hàng )</p>
        </div>
      ) : (
        <>
          <Quantity />
          <Submit productName={product.name} productSalePrice={product.salePrice} />
        </>
      )}
    </div>
  )
}
