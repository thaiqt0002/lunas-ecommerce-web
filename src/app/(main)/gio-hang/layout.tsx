import { Metadata } from 'next'

import Footer from '@core/components/layouts/Footer'

export const metadata: Metadata = {
  title: 'Giỏ hàng',
}
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <section>{children}</section>
      <Footer />
    </>
  )
}
