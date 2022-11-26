import { Prisma } from '@prisma/client'

type Course = Prisma.CourseGetPayload<{
  include: { user: { select: { name: true; image: true } } }
}>

export type CourseDetailsProps = {
  course: Course
}

export default function CourseDetails({ course }: CourseDetailsProps) {
  return (
    <div>
      <h1>Course Details</h1>
      <p>{JSON.stringify(course)}</p>
    </div>
  )
}
