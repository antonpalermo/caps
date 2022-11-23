import dynamic from 'next/dynamic'

const DynamicDrafts = dynamic(() => import('@courses/Drafts'), {
  suspense: true
})

export default function CoursesDraftsPage() {
  return <DynamicDrafts />
}
