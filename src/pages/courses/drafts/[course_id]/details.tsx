import dynamic from 'next/dynamic'

import { options } from '@auth/[...nextauth]'
import { unstable_getServerSession } from 'next-auth'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { Prisma } from '@prisma/client'
import MainLayout from '@ui/Layout'
import { ReactElement } from 'react'

const DynamicCourseDetails = dynamic(() => import('@courses/CourseDetails'))

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  query: { course_id }
}: GetServerSidePropsContext) => {
  const endpoint = new URL(
    `/api/courses?id=${course_id}`,
    process.env.NEXTAUTH_URL
  )
  const request = await fetch(endpoint)
  const session = await unstable_getServerSession(req, res, options)

  const course = await request.json()

  if (!course) {
    return {
      notFound: true
    }
  }

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: `${process.env.NEXTAUTH_URL}/api/auth/signin`
      }
    }
  }

  return {
    props: { course }
  }
}

type Course = Prisma.CourseGetPayload<{
  include: { user: { select: { name: true; image: true } } }
}>

export type CourseDetailsProps = {
  course: Course
}

export default function CourseDetails({ course }: CourseDetailsProps) {
  return <DynamicCourseDetails course={course} />
}

CourseDetails.getLayout = (page: ReactElement) => {
  const { name } = page.props.course
  return <MainLayout title={`Course Details - ${name}`}>{page}</MainLayout>
}
