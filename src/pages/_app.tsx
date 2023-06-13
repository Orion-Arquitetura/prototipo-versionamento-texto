import "@/styles/globals.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import FilesFiltersContextProvider from "@/contexts/FilesFiltersContext";
import AuthContextProvider from "@/contexts/AuthContext";
import Layout from "./layout";
import ProjectCRUDContextProvider from "@/contexts/ProjectCrudContext";
import UserCRUDContextProvider from "@/contexts/UserCrudContext";
import FileCRUDContextProvider from "@/contexts/FileCrudContext";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <FilesFiltersContextProvider>
          <UserCRUDContextProvider>
            <ProjectCRUDContextProvider>
              <FileCRUDContextProvider>
                <Layout>
                  <Component {...pageProps} />
                </Layout>
              </FileCRUDContextProvider>
            </ProjectCRUDContextProvider>
          </UserCRUDContextProvider>
        </FilesFiltersContextProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  );
}
