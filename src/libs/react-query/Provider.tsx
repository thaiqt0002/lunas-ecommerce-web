'use client'
import { usePathname } from 'next/navigation'
import { ReactNode, useState } from 'react'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

function QueryProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const condition = pathname === '/iframe'
  const [queryClient] = useState(() => new QueryClient())
  return (
    <>
      {!condition ? (
        <QueryClientProvider client={queryClient}>
          {children}
          <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" />
        </QueryClientProvider>
      ) : (
        <>{children}</>
      )}
    </>
  )
}
export default QueryProvider
