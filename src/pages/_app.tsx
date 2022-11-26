import React, { ReactElement } from 'react'

import { AppProps } from '@lib/pageLayout'
import { SessionProvider } from 'next-auth/react'

import { ReactQueryDevtools } from 'react-query/devtools'
import { QueryClient, QueryClientProvider } from 'react-query'

function App({ Component, pageProps: { session, ...props } }: AppProps) {
  const getLayout = Component.getLayout ?? ((page: ReactElement) => page)
  const client = new QueryClient()

  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={client}>
        <ReactQueryDevtools />
        {getLayout(<Component {...props} />)}
      </QueryClientProvider>
    </SessionProvider>
  )
}

export default App
