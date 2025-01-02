import Link from 'next/link'
import {
  Breadcrumb,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@customafk/lunas-ui/Atoms/Breadcrumb'

import publicServer from '@core/services/server/public'

interface IParams {
  params: Promise<{ slug: string }>
}
export default async function Page({ params }: IParams) {
  const { slug } = await params
  const uuid = slug.split('_')[1]
  const { product } = await publicServer.getProductDetail(uuid)
  return (
    <section className="container mx-auto py-6 font-bold">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbLink href={'/'}>Trang chủ</BreadcrumbLink>
          <BreadcrumbSeparator />

          <BreadcrumbLink asChild>
            <p>Sản phẩm</p>
          </BreadcrumbLink>

          <BreadcrumbSeparator />

          <BreadcrumbLink asChild>
            <Link href={'/san-pham'}>{product.name}</Link>
          </BreadcrumbLink>
        </BreadcrumbList>
      </Breadcrumb>
    </section>
  )
}
