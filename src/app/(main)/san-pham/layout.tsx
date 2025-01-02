import { Metadata } from 'next'
import { ReactNode } from 'react'

import publicServer from '@core/services/server/public'

import Footer from '@core/components/layouts/Footer'

import { Provider } from './_components/Provider'

export const metadata: Metadata = {
  title: 'Sản phẩm',
}

export async function generateStaticParams() {
  const product = await publicServer.getProductPageList()
  return product.map((product) => ({
    slug: `${product.slug}_${product.uuid}`,
  }))
}
interface ILayout {
  breadcrumb: ReactNode
  description: ReactNode
  detail: ReactNode
  preview: ReactNode
}
export default function Layout({ breadcrumb, description, detail, preview }: ILayout) {
  return (
    <>
      {breadcrumb}
      <section className="container flex flex-col gap-y-8">
        <Provider
          imageSelected={{
            name: 'product.name',
            url: 'thumbnail',
          }}
        >
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {preview}
            {detail}
          </div>
          {description}
        </Provider>
      </section>
      <Footer />
    </>
  )
}
