import { options } from '@auth/[...nextauth]'
import { GetServerSidePropsContext } from 'next'
import { unstable_getServerSession } from 'next-auth'

export default function baseSSR(gssp: any) {
  return async (ctx: GetServerSidePropsContext) => {
    const session = await unstable_getServerSession(ctx.req, ctx.res, options)

    if (!session) {
      return {
        redirect: {
          permanent: false,
          destination: `${process.env.BASE_URL}/api/auth/signin`
        }
      }
    }

    if (!session.user.role) {
      return {
        redirect: {
          permanent: false,
          destination: `${
            process.env.NEXTAUTH_URL
          }/role?return=${encodeURIComponent(ctx.resolvedUrl)}`
        }
      }
    }

    return await gssp(ctx)
  }
}
