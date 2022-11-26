import dynamic from 'next/dynamic'

const DynamicDrafts = dynamic(() => import('@courses/CourseDrafts'), {
  suspense: true
})

export default function CoursesDraftsPage() {
  return <DynamicDrafts />
}
