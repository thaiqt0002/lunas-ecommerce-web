import {
  Breadcrumb,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@customafk/lunas-ui/Atoms/Breadcrumb'

import Footer from '@core/components/layouts/Footer'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <section className="container mx-auto py-6 font-bold">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbLink href={'/'}>Trang chủ</BreadcrumbLink>
            <BreadcrumbSeparator />

            <BreadcrumbLink asChild>
              <p>Liên hệ</p>
            </BreadcrumbLink>
          </BreadcrumbList>
        </Breadcrumb>
      </section>
      <section className="container rounded-xl bg-ui-surface-50 px-14 py-12 shadow-ui-flat">
        {children}
      </section>
      <Footer />
    </>
  )
}
