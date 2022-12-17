import { Prisma } from '@prisma/client'

type Course = Prisma.CourseGetPayload<{
  include: { user: { select: { name: true; image: true } } }
}>

export type CourseProps = {
  course: Course
}

export default function Course({
  course: { name, description, user }
}: CourseProps) {
  return (
    <div>
      <h1>{name}</h1>
      <p>{description}</p>
      <strong>{user.name}</strong>
    </div>
  )
}
