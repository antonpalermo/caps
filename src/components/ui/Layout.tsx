import Head from 'next/head'
import { HTMLAttributes } from 'react'

import { signOut } from 'next-auth/react'
import Link from 'next/link'

export type MainLayoutProps = HTMLAttributes<HTMLDivElement> & {
  title?: string
}

export default function MainLayout({ title, ...props }: MainLayoutProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <button onClick={() => signOut()}>sign out</button>
      <div>
        <Link href="/courses">Courses</Link>
      </div>
      <div {...props} />
    </>
  )
}
