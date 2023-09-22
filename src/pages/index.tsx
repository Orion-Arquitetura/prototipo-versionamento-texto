import LoginForm from '@/components/LoginForm'
import { useQueryClient } from '@tanstack/react-query'
import { GetServerSidePropsContext } from 'next'
import Router from 'next/router'
import { parseCookies } from 'nookies'
import { useEffect } from 'react'

export default function Home() {
  return (
    <>
      <LoginForm />
    </>
  )
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const cookies = parseCookies(ctx)

  if (cookies.client_tipo) {
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
