import { HTMLAttributes, useEffect } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/router'
import Head from 'next/head'
import fetcher from '@lib/fetcher'
import { useQuery, useQueryClient } from 'react-query'
import { Doc } from '@prisma/client'

export type CourseLayoutProps = HTMLAttributes<HTMLDivElement> & {
  title: string
}

export default function CourseLayout({ ...props }: CourseLayoutProps) {
  const router = useRouter()

  const fetchDocs = async () =>
    await fetcher(`/api/courses/${router.query.cid}/docs`)

  const queryClient = useQueryClient()

  const { data, isFetching } = useQuery<Doc[]>('docs', fetchDocs)

  async function createCourseSection() {
    const doc = await fetcher(`/api/courses/${router.query.cid}/docs/create`)
    if (!doc) {
      return
    }
    router.push(`/courses/edit/${router.query.cid}/${doc.id}`)
  }

  useEffect(() => {}, [])

  if (isFetching) {
    return <h1>Loading...</h1>
  }

  return (
    <>
      <Head>
        <title>{props.title}</title>
      </Head>
      <button onClick={createCourseSection}>Add Doc</button>
      <Link href={`/courses/edit/${router.query.cid}/details`}>Details</Link>
      <div>
        {data &&
          data.map(doc => (
            <>
              <Link
                key={doc.id}
                href={`/courses/edit/${router.query.cid}/${doc.id}`}>
                {doc.header}
              </Link>
              <br />
            </>
          ))}
      </div>
      <div {...props} />
    </>
  )
}
