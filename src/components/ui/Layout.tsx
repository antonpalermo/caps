import Head from 'next/head'
import { HTMLAttributes } from 'react'

export type MainLayoutProps = HTMLAttributes<HTMLDivElement> & {
  title?: string
}

export default function MainLayout({ title, ...props }: MainLayoutProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div {...props} />
    </>
  )
}
