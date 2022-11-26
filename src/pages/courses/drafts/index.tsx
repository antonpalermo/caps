import { ReactElement } from 'react'
import dynamic from 'next/dynamic'

import { options } from '@auth/[...nextauth]'
import { unstable_getServerSession } from 'next-auth'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'

import MainLayout from '@ui/Layout'

const DynamicCourseDrafts = dynamic(() => import('@courses/CourseDrafts'), {
  suspense: true
})

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res
}: GetServerSidePropsContext) => {
  const session = await unstable_getServerSession(req, res, options)

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: `${process.env.NEXTAUTH_URL}/api/auth/signin`
      }
    }
  }

  return {
    props: {}
  }
}

export default function CourseDraftsPage() {
  return <DynamicCourseDrafts />
}

CourseDraftsPage.getLayout = (page: ReactElement) => {
  return <MainLayout title="Course Drafts">{page}</MainLayout>
}
