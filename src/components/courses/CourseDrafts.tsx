import Head from 'next/head'

import { useQuery } from 'react-query'
import { Prisma } from '@prisma/client'
import { useRouter } from 'next/router'

const fetchCourses = async () => {
  const request = await fetch('/api/courses')
  if (!request.ok) {
    throw new Error(`${await request.json()}`)
  }
  return await request.json()
}

type Course = Prisma.CourseGetPayload<{
  include: { user: { select: { name: true; image: true } } }
}>

export default function CourseDrafts() {
  const router = useRouter()
  const { data, isLoading } = useQuery<Course[]>('courses', fetchCourses, {})

  if (isLoading) {
    return <h1>loading...</h1>
  }

  function handleEdit(course_id: string) {
    router.push({
      pathname: '/courses/drafts/[course_id]/details',
      query: { course_id }
    })
  }

  return (
    <>
      <h1>Course Drafts</h1>
      {data.map(course => (
        <div key={course.id}>
          <h1>{course.name}</h1>
          <h2>Created: {course.user.name}</h2>
          <button onClick={() => handleEdit(course.id)}>edit</button>
        </div>
      ))}
    </>
  )
}
