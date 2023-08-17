import LoginForm from '@/components/LoginForm'
import { GetServerSidePropsContext } from 'next'
import { parseCookies } from 'nookies'

export default function Home() {
  return (
    <>
      <LoginForm />
    </>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const token = parseCookies(context)["token"]

  if (token) {
    return {
      redirect: {
        destination: "/auth/projetos",
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
}
