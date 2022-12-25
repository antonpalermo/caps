import { HTMLAttributes, useEffect, useState } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/router'
import Head from 'next/head'
import fetcher from '@lib/fetcher'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { Doc } from '@prisma/client'

export type CourseLayoutProps = HTMLAttributes<HTMLDivElement> & {
  title: string
}

export default function CourseLayout({ ...props }: CourseLayoutProps) {
  const router = useRouter()
  const queryClient = useQueryClient()

  const [header, setHeader] = useState<string>()

  const fetchDocs = async () =>
    await fetcher(`/api/courses/${router.query.cid}/docs`)

  const createDoc = async (header: string) =>
    await fetcher(`/api/courses/${router.query.cid}/docs/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ header })
    })

  const { data, isFetching } = useQuery<Doc[]>('docs', fetchDocs)

  const mutation = useMutation(createDoc, {
    onSuccess: data => {
      queryClient.invalidateQueries('docs')
      router.push(`/courses/edit/${router.query.cid}/${data.id}`)
    }
  })

  async function createCourseSection() {
    mutation.mutate(header)
  }

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
        <div>
          <input
            type="text"
            name="header"
            id="header"
            value={header}
            onChange={e => setHeader(e.target.value)}
          />
        </div>
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
