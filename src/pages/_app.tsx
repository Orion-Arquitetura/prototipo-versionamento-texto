import "@/styles/globals.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import FileContextProvider from "@/contexts/filesFiltersContext";
import AuthContextProvider from "@/contexts/AuthContext";
import Layout from "./layout";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <FileContextProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </FileContextProvider>
        </AuthContextProvider>
    </QueryClientProvider>
  );
}
