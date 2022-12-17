import { HTMLAttributes } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/router'
import Head from 'next/head'

export type CourseLayoutProps = HTMLAttributes<HTMLDivElement> & {
  title: string
}

export default function CourseLayout({ ...props }: CourseLayoutProps) {
  const router = useRouter()

  return (
    <>
      <Head>
        <title>{props.title}</title>
      </Head>
      <Link href={`/courses/edit/${router.query.cid}/details`}>Details</Link>
      <div {...props} />
    </>
  )
}
