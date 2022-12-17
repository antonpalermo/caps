import { ReactElement, Suspense } from 'react'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'

import { useQuery } from 'react-query'

import { Prisma } from '@prisma/client'
import { options } from '@auth/[...nextauth]'
import { unstable_getServerSession } from 'next-auth'

import MainLayout from '@ui/Layout'
import CourseList from '@course/CourseList'

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res
}: GetServerSidePropsContext) => {
  const endpoint = new URL('/api/courses', process.env.NEXTAUTH_URL)
  const request = await fetch(endpoint)
  const session = await unstable_getServerSession(req, res, options)

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: `${process.env.NEXTAUTH_URL}/api/auth/signin`
      }
    }
  }

  return {
    props: {
      courses: await request.json()
    }
  }
}

type Course = Prisma.CourseGetPayload<{
  include: { user: { select: { name: true; image: true } } }
}>

type CoursesPageProps = {
  courses: Course[]
}

export default function CoursesPage({ courses }: CoursesPageProps) {
  const fetchCourses = async () => await (await fetch('/api/courses')).json()
  const { data } = useQuery<Course[]>('courses', fetchCourses, {
    initialData: courses,
    suspense: true
  })

  return (
    <Suspense fallback={'Loading'}>
      <CourseList courses={data} />
    </Suspense>
  )
}

CoursesPage.getLayout = (page: ReactElement) => {
  return <MainLayout title="Courses">{page}</MainLayout>
}
