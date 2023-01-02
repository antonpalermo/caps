import { ReactElement } from 'react'
import { GetServerSidePropsContext } from 'next'

import baseSSR from '@lib/baseSSR'
import CourseLayout from '@course/CourseLayout'
import fetcher from '@lib/fetcher'

export const getServerSideProps = baseSSR(
  async (ctx: GetServerSidePropsContext) => {
    const { cid, sid } = ctx.query

    const endpoint = new URL(
      `/api/courses/${cid}/docs/${sid}`,
      process.env.BASE_URL
    )

    const course = await fetcher(endpoint)

    return {
      props: { course }
    }
  }
)

export default function CourseSection() {
  return <h1>Course Section</h1>
}

CourseSection.getLayout = (page: ReactElement) => {
  const title = page.props.course.header

  return <CourseLayout title={title}>{page}</CourseLayout>
}
