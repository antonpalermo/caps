import { ReactElement, ReactNode } from 'react'

import { NextPage } from 'next'
import { AppProps as NextAppProps } from 'next/app'

export type PageLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

export type AppProps = NextAppProps & {
  Component: PageLayout
}
