import { HTMLAttributes, useEffect } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/router'
import Head from 'next/head'
import fetcher from '@lib/fetcher'

export type CourseLayoutProps = HTMLAttributes<HTMLDivElement> & {
  title: string
}

export default function CourseLayout({ ...props }: CourseLayoutProps) {
  const router = useRouter()

  async function createCourseSection() {
    const doc = await fetcher(`/api/courses/${router.query.cid}/docs/create`)
    if (!doc) {
      return
    }
    router.push(`/courses/edit/${router.query.cid}/${doc.id}`)
  }

  useEffect(() => {}, [])

  return (
    <>
      <Head>
        <title>{props.title}</title>
      </Head>
      <button onClick={createCourseSection}>Add Doc</button>
      <Link href={`/courses/edit/${router.query.cid}/details`}>Details</Link>
      <Link href={`/courses/edit/${router.query.cid}/some_section`}>
        Section
      </Link>
      <div {...props} />
    </>
  )
}
