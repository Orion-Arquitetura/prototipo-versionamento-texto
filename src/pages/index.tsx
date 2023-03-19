import LoginPage from "@/components/LoginPage";
import { Container } from "@mui/material";
import Head from "next/head";

export default function Home() {

  return (
    <>
      <Head>
        <title>Orion</title>
        <meta
          name="description"
          content="Gerenciador de versões de arquivo de texto"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <link
          rel="icon"
          href="/favicon.ico"
        />
      </Head>
      <Container
        component="main"
        maxWidth={"xl"}
        style={{ minHeight: "100vh" }}
      >
        <LoginPage />
      </Container>
    </>
  );
}
