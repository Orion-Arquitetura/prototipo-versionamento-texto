import "@/styles/globals.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import ResponsiveAppBar from "@/components/AppBar";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import FileContextProvider from "@/contexts/fileContext";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();

  return (
    <FileContextProvider>
      <QueryClientProvider client={queryClient}>
        {pathname === "/" ? null : <ResponsiveAppBar />}
        <Component {...pageProps} />
      </QueryClientProvider>
    </FileContextProvider>
  );
}
