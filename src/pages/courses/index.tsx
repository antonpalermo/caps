import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const Courses = dynamic(() => import('@courses/Courses'), {
  suspense: true
})

export default function CoursesPage() {
  return (
    <Suspense fallback={'Loading'}>
      <Courses />
    </Suspense>
  )
}
