import React, { ReactElement } from 'react'

import { AppProps } from '@lib/pageLayout'
import { SessionProvider } from 'next-auth/react'

function App({ Component, pageProps: { session, ...props } }: AppProps) {
  const getLayout = Component.getLayout ?? ((page: ReactElement) => page)

  return (
    <SessionProvider session={session}>
      {getLayout(<Component {...props} />)}
    </SessionProvider>
  )
}

export default App
