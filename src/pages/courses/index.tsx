import { ReactElement, Suspense } from 'react'
import { useRouter } from 'next/router'
import { GetServerSidePropsContext } from 'next'

import { useQuery } from 'react-query'

import { Prisma } from '@prisma/client'

import Course from '@course/Course'
import MainLayout from '@ui/Layout'

import fetcher from '@lib/fetcher'
import baseSSR from '@lib/baseSSR'

export const getServerSideProps = baseSSR(
  async ({}: GetServerSidePropsContext) => {
    const endpoint = new URL('/api/courses', process.env.BASE_URL)
    const courses = await fetcher(endpoint)

    return { props: { courses } }
  }
)

type Course = Prisma.CourseGetPayload<{
  include: { user: { select: { name: true; image: true } } }
}>

type CoursesPageProps = {
  courses: Course[]
}

export default function CoursesPage({ courses }: CoursesPageProps) {
  const router = useRouter()
  const fetchCourses = async () => await fetcher('/api/courses')
  const { data } = useQuery<Course[]>('courses', fetchCourses, {
    initialData: courses,
    suspense: true
  })

  async function createCourse() {
    const course = await fetcher('/api/courses/create', {
      method: 'POST'
    })

    if (data) {
      return router.push(`/courses/edit/${course.id}/details`)
    }

    return
  }

  return (
    <div>
      <h1>Courses</h1>
      <button onClick={createCourse}>New</button>
      <Suspense fallback={'Loading'}>
        {data && data.map(course => <Course key={course.id} course={course} />)}
      </Suspense>
    </div>
  )
}

CoursesPage.getLayout = (page: ReactElement) => {
  return <MainLayout title="Courses">{page}</MainLayout>
}
