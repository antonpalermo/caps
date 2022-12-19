import { HTMLAttributes } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/router'
import Head from 'next/head'

export type CourseLayoutProps = HTMLAttributes<HTMLDivElement> & {
  title: string
}

export default function CourseLayout({ ...props }: CourseLayoutProps) {
  const router = useRouter()

  async function createCourseSection() {
    const endpoint = new URL('', process.env.BASE_URL)
  }

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
