import { ReactElement, Suspense } from 'react'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'

import { options } from '../api/auth/[...nextauth]'
import { Session, unstable_getServerSession } from 'next-auth'

import dynamic from 'next/dynamic'
import MainLayout from '@ui/Layout'

const Courses = dynamic(() => import('@courses/Courses'), {
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

export type CoursesPageProps = {}

export default function CoursesPage(props: CoursesPageProps) {
  return (
    <Suspense fallback={'Loading'}>
      <Courses />
    </Suspense>
  )
}

CoursesPage.getLayout = (page: ReactElement) => {
  return <MainLayout title="Courses">{page}</MainLayout>
}
