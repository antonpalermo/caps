import fetcher from '@lib/fetcher'
import { Role } from '@prisma/client'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

export default function Courses() {
  const router = useRouter()
  // session hooks.
  const { data, status } = useSession()
  // session loading status.
  const loading = status !== 'loading'
  // checker if user has role of 'professor'
  const hasAdminRights = loading && data.user.role === Role.professor

  async function createTemplate() {
    const { data, error } = await fetcher('/api/courses', { method: 'POST' })
    if (error) {
      // TODO: use react hot toast to render this error.
      console.log(error)
      return
    }
    // if everything is okay then redirect user to course details
    router.push({
      pathname: '/courses/drafts/[course_id]/details',
      query: { course_id: data.id }
    })
  }

  return (
    <div>
      <h1>Courses</h1>
      {hasAdminRights && (
        <button onClick={createTemplate}>Create Course</button>
      )}
    </div>
  )
}
