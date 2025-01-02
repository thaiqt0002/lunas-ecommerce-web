'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useCookies } from 'react-cookie'
import { default as DefaultHeader } from '@customafk/lunas-ui/Organisms/Header'

import { helper } from '@core/libs/helper'

import authService from '@core/services/auth'
import cartClientService from '@core/services/clients/cart'
import publicClientService from '@core/services/clients/public'

import { channels } from '@core/constants'

import InStockLists from './components/InStockLists'
import OrderLists from './components/OrderLists'
import useFormatCart from './hooks/useFormatCart'

export default function Header() {
  const router = useRouter()

  const { data: user, isFetching } = authService.useGetMe()
  const { data: categories } = publicClientService.useGetCategories()
  const { data, isPending } = cartClientService.useGetCarts()
  const [, setCookie] = useCookies(['draft-bill'])
  const [typeCart, setTypeCart] = useState<'ORDER' | 'IN_STOCK'>('ORDER')

  const carts = useFormatCart({ data })
  const amountTotal = carts.reduce((acc, cart) => acc + cart.salePrice * cart.quantity, 0)
  return (
    <DefaultHeader
      user={
        user
          ? {
              ...user,
              avatar: user.avatar ? helper.convertImageUrl(user.avatar) : null,
            }
          : undefined
      }
      isLoading={isFetching}
      categories={categories ?? []}
      cartsAmountTotal={amountTotal}
      cartOrder={<OrderLists data={carts} />}
      cartInStock={<InStockLists data={carts} />}
      onSignIn={() => helper.openAuthLogin()}
      onSignUp={() => helper.openAuthSignUp()}
      onSettingSelected={(select) => {
        if (select === 'PROFILE') {
          window.open('https://dev.auth.lunas.vn/user', '_blank')
        }
        if (select === 'SECURITY') {
          window.open('https://dev.auth.lunas.vn/user/security', '_blank')
        }
        if (select === 'NOTIFICATION') {
          window.open('https://dev.auth.lunas.vn/user/notification', '_blank')
        }
        if (select === 'RESERVATION') {
          window.open('https://dev.auth.lunas.vn/user/reservation', '_blank')
        }
        if (select === 'ADDRESS') {
          window.open('https://dev.auth.lunas.vn/user/address', '_blank')
        }
        if (select === 'LOGOUT') {
          const authChannel = new BroadcastChannel(channels.auth)
          authChannel.postMessage({
            action: 'LOGOUT',
            type: 'AUTH',
          })
          authChannel.close()
        }
      }}
      onCartTypeSelected={(type) => {
        setTypeCart(type)
      }}
      onCartCheckout={() => {
        if (typeCart === 'ORDER') {
          setCookie(
            'draft-bill',
            carts
              .filter((cart) => cart.productStatus === 'ORDER' || cart.productStatus === 'PREORDER')
              .map((cart) => ({
                variantUuid: cart.variantUuid,
                quantity: cart.quantity,
                price: cart.salePrice,
                metadata: {
                  productName: cart.productName,
                  variantName: cart.varianName,
                  variantImage: helper.convertImageUrl(cart.variantImage),
                },
              })),
          )
        } else {
          setCookie(
            'draft-bill',
            carts
              .filter((cart) => cart.productStatus === 'IN_STOCK')
              .map((cart) => ({
                variantUuid: cart.variantUuid,
                quantity: cart.quantity,
                price: cart.salePrice,
                metadata: {
                  productName: cart.productName,
                  variantName: cart.varianName,
                  variantImage: helper.convertImageUrl(cart.variantImage),
                },
              })),
          )
        }
        window.open('https://dev.payment.lunas.vn/thanh-toan', '_blank')
      }}
      onShowAllProduct={() => router.push('/danh-muc')}
      onCartShowAll={() => router.push('/gio-hang')}
      onCategorySelected={(category) => router.push(`/danh-muc/${category}`)}
      onContactUs={() => router.push('/lien-he')}
      className="z-50"
    />
  )
}
