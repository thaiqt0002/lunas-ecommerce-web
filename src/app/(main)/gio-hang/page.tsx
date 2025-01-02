'use client'

import cartClientService from '@core/services/clients/cart'

import CartLists from './_components/CartLists'
import { CartPageProvider } from './_components/Provider'
import Sidebar from './_components/Sidebar'
import useFormatCart from './_hooks/useFormatCart'

export default function Page() {
  const { data } = cartClientService.useGetCarts()
  const carts = useFormatCart({ data })
  return (
    <CartPageProvider>
      <main className="container grid grid-cols-1 gap-8 py-6 md:grid-cols-3">
        <CartLists data={carts} />
        <Sidebar data={carts} />
      </main>
    </CartPageProvider>
  )
}
