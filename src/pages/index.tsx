import React from 'react'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'

import { useSession } from 'next-auth/react'
import { unstable_getServerSession } from 'next-auth'

import { options } from './api/auth/[...nextauth]'

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  resolvedUrl
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

  if (!session.user.role) {
    return {
      redirect: {
        permanent: false,
        destination: `${
          process.env.NEXTAUTH_URL
        }/role_selector?return=${encodeURIComponent(resolvedUrl)}`
      }
    }
  }

  return {
    props: {}
  }
}

function Home() {
  const { data, status } = useSession()
  const loading = status !== 'loading'

  return (
    <div>
      <h1>Home Component</h1>
      {loading && JSON.stringify(data)}
    </div>
  )
}

export default Home
