import React from 'react'

import {
  QueryClientProvider,
  QueryClient,
  Hydrate,
  DehydratedState,
} from '@tanstack/react-query'
import { SessionProvider } from 'next-auth/react'
import { Session } from 'next-auth'

import Layout from '@components/Layout'

import type { AppProps } from 'next/app'
import '../styles/globals.scss'

function App({
  Component,
  pageProps,
}: AppProps<{
  dehydratedState: DehydratedState
  session: Session
}>) {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: { staleTime: Infinity, refetchOnWindowFocus: false },
        },
      }),
  )

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={pageProps.session}>
        <Hydrate state={pageProps.dehydratedState}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Hydrate>
      </SessionProvider>
    </QueryClientProvider>
  )
}

export default App
