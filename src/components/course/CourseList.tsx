import { Prisma } from '@prisma/client'

type Course = Prisma.CourseGetPayload<{
  include: { user: { select: { name: true; image: true } } }
}>

type CourseListProps = {
  courses: Course[]
}

export default function CourseList({ courses }: CourseListProps) {
  return (
    <div>
      <h1>Course List</h1>
      <div>
        {courses.map(course => (
          <div key={course.id}>
            <h1>{course.name}</h1>
            <p>{course.description}</p>
            <strong>{course.user.name}</strong>
          </div>
        ))}
      </div>
    </div>
  )
}
