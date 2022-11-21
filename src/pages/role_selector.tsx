import React from 'react'

import { unstable_getServerSession } from 'next-auth'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'

import { options } from './api/auth/[...nextauth]'
import { Role } from '@prisma/client'
import { useRouter } from 'next/router'

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  query
}: GetServerSidePropsContext) => {
  const returnUrl = query.return as string
  const session = await unstable_getServerSession(req, res, options)

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: `${process.env.NEXTAUTH_URL}/api/auth/signin`
      }
    }
  }

  if (session.user.role) {
    return {
      redirect: {
        permanent: false,
        destination: returnUrl ? `${decodeURIComponent(returnUrl)}` : '/'
      }
    }
  }

  return {
    props: {}
  }
}

function RoleSelector() {
  const router = useRouter()

  const role = async (role: Role) => {
    const request = await fetch('/api/users', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ role })
    })

    if (request.ok) {
      router.replace({
        pathname: router.query.return
          ? decodeURIComponent(`${router.query.return}`)
          : '/'
      })
    }
  }

  return (
    <div>
      <h1>Select your assigned role!</h1>
      <button onClick={() => role('student')}>I'm a Student</button>
      {/* TODO: add supporting docs for professor */}
      <button onClick={() => role('professor')}>I'm a Professor</button>
    </div>
  )
}

export default RoleSelector
