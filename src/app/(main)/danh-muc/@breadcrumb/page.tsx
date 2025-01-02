import { Metadata } from 'next'
import Link from 'next/link'
import {
  Breadcrumb,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@customafk/lunas-ui/Atoms/Breadcrumb'

export const metadata: Metadata = {
  title: 'Danh mục',
}

export default function Page() {
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
        </BreadcrumbList>
      </Breadcrumb>
    </section>
  )
}
