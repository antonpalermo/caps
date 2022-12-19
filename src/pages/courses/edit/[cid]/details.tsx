import { ReactElement } from 'react'
import { GetServerSidePropsContext } from 'next'
import { Form, Formik, FormikHelpers } from 'formik'

import { Prisma } from '@prisma/client'

import Input from '@ui/Input'
import Textarea from '@ui/Textarea'
import CourseLayout from '@course/CourseLayout'

import baseSSR from '@lib/baseSSR'

type Details = {
  name: string
  description?: string
}

export const getServerSideProps = baseSSR(
  async ({ query }: GetServerSidePropsContext) => {
    const endpoint = new URL(`/api/courses/${query.cid}`, process.env.BASE_URL)
    const request = await fetch(endpoint)
    const course = await request.json()

    return !course ? { notFound: true } : { props: { course } }
  }
)

export type CourseDetailsProps = {
  course: Prisma.CourseGetPayload<{
    include: { user: { select: { name: true; image: true } } }
  }>
}

export default function CourseDetails({ course }: CourseDetailsProps) {
  const initialValues: Details = {
    name: course.name === 'Untitled' ? '' : course.name,
    description:
      course.description === 'Blank untitled template' ? '' : course.description
  }

  async function submit(value: Details, helpers: FormikHelpers<Details>) {
    console.log(value)
  }

  return (
    <div>
      <h1>Course Details</h1>
      <Formik initialValues={initialValues} onSubmit={submit}>
        {({ isSubmitting }) => (
          <Form>
            <Input
              name="name"
              label="Name"
              type="text"
              autoComplete="off"
              placeholder="Untitled"
            />
            <Textarea
              name="description"
              label="Description"
              placeholder="Description"
            />
            <button disabled={isSubmitting} type="submit">
              Update
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
}

CourseDetails.getLayout = (page: ReactElement) => {
  return <CourseLayout title="Course Details">{page}</CourseLayout>
}
