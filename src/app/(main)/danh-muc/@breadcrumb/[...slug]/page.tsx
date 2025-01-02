import Link from 'next/link'
import {
  Breadcrumb,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@customafk/lunas-ui/Atoms/Breadcrumb'

import publicServer from '@core/services/server/public'
interface IParams {
  params: Promise<{
    slug: string[]
  }>
}
export default async function Page({ params }: IParams) {
  const slug = (await params).slug
  const [categorySlug, subCategorySlug] = slug
  const categories = await publicServer.getCategories()
  return (
    <section className="container mx-auto py-6 font-bold">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbLink asChild>
            <Link href={'/'}>Trang chủ</Link>
          </BreadcrumbLink>

          <BreadcrumbSeparator />

          <BreadcrumbLink asChild>
            <Link href={'/danh-muc'}>Danh mục</Link>
          </BreadcrumbLink>

          <BreadcrumbSeparator />

          <BreadcrumbLink asChild>
            <Link href={`/danh-muc/${categorySlug}`}>
              {categories.find(({ slug }) => slug === categorySlug)?.name}
            </Link>
          </BreadcrumbLink>

          {subCategorySlug && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbLink asChild>
                <Link href={`/danh-muc/${categorySlug}/${subCategorySlug}`}>
                  {
                    categories
                      .find(({ slug }) => slug === categorySlug)
                      ?.sub.find(({ slug }) => slug === subCategorySlug)?.name
                  }
                </Link>
              </BreadcrumbLink>
            </>
          )}
        </BreadcrumbList>
      </Breadcrumb>
    </section>
  )
}
