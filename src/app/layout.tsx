/* eslint-disable camelcase, new-cap */
import type { Metadata } from 'next'
import { Mulish } from 'next/font/google'

import { cn } from '@core/libs/cn'
import { CookiesProviderLib } from '@core/libs/cookies/provider'
import ReactOauth from '@core/libs/react-oauth'
import QueryProvider from '@core/libs/react-query/Provider'
import { Toaster } from '@core/libs/toaster/ToasterProvider'
import StoreProvider from '@core/libs/zustand/Provider'

import Header from '@core/components/layouts/Header'
import MessageComponent from '@core/components/MessageComponent'
import MessengerChat from '@core/components/MessengerChat'

import '@core/styles/global.css'

const mulish = Mulish({
  weight: ['200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['vietnamese'],
})

export const metadata: Metadata = {
  title: {
    template: '%s | Lunas Store',
    default: 'Lunas Store',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={cn(mulish.className)}>
        <CookiesProviderLib>
          <QueryProvider>
            <StoreProvider>
              <main className="grid size-full grid-rows-[auto_1fr]">
                <Header />
                {children}
              </main>
              <MessageComponent />
              <ReactOauth />
            </StoreProvider>
          </QueryProvider>
        </CookiesProviderLib>
        <Toaster />
        <MessengerChat />
      </body>
    </html>
  )
}
