'use client'
import { CookiesProvider } from 'react-cookie'

export const CookiesProviderLib = ({ children }: { children: React.ReactNode }) => {
  return (
    <CookiesProvider
      defaultSetOptions={{
        domain: '.lunas.vn',
      }}
    >
      {children}
    </CookiesProvider>
  )
}
