import '@/styles/globals.css'
import type { AppProps } from 'next/app';
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ThemeProvider } from '@emotion/react';
import { theme } from "@/theme/theme";
import Layout from '@/components/Layout';
import Head from 'next/head';
import AuthContextProvider from '@/context/AuthContext';
import DialogModalContextProvider from '@/context/DialogModalContext';

const queryClient = new QueryClient({ defaultOptions: { queries: { refetchOnWindowFocus: false, retry: false } } });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Orion Arquitetura</title>
        <meta name="description" content="Gerenciador de projetos Orion Arquitetura" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/orion-estrela.png" />
      </Head>
      <DialogModalContextProvider>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            <AuthContextProvider>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </AuthContextProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </DialogModalContextProvider>
    </>
  )
}
