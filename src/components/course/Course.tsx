import { Prisma } from '@prisma/client'
import { useRouter } from 'next/router'

type Course = Prisma.CourseGetPayload<{
  include: { user: { select: { name: true; image: true } } }
}>

export type CourseProps = {
  course: Course
}

export default function Course({
  course: { id, name, description, user }
}: CourseProps) {
  const router = useRouter()

  return (
    <div>
      <h1>{name}</h1>
      <p>{description}</p>
      <strong>{user.name}</strong>
      <button onClick={() => router.push(`/courses/edit/${id}/details`)}>
        Edit
      </button>
    </div>
  )
}
