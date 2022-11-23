import dynamic from 'next/dynamic'

const DynamicCourseDetails = dynamic(() => import('@courses/Details'))

export default function CourseDetails() {
  return <DynamicCourseDetails />
}
