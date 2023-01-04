import React, { ReactElement } from 'react'

import { useSession } from 'next-auth/react'
import { GetServerSidePropsContext } from 'next'

import baseSSR from '@lib/baseSSR'
import MainLayout from '@ui/Layout'

export const getServerSideProps = baseSSR(
  async (ctx: GetServerSidePropsContext) => {
    return {
      props: {}
    }
  }
)

function Home() {
  const { data, status } = useSession()
  const loading = status !== 'loading'

  return (
    <div>
      <h1 className='text-sm'>Home Component</h1>
      {loading && JSON.stringify(data)}
    </div>
  )
}

Home.getLayout = (page: ReactElement) => {
  return <MainLayout title="Home">{page}</MainLayout>
}

export default Home
