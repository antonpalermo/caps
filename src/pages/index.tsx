import { useSession } from 'next-auth/react'
import React from 'react'

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
