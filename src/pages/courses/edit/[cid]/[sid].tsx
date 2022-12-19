import { ReactElement } from 'react'
import { GetServerSidePropsContext } from 'next'

import baseSSR from '@lib/baseSSR'
import CourseLayout from '@course/CourseLayout'

export const getServerSideProps = baseSSR(
  async (ctx: GetServerSidePropsContext) => {
    return {
      props: {}
    }
  }
)

export default function CourseSection() {
  return <h1>Course Section</h1>
}

CourseSection.getLayout = (page: ReactElement) => {
  return <CourseLayout title="Course Section">{page}</CourseLayout>
}
