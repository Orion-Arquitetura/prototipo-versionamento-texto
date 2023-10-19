import PageTitle from "@/components/PageTitle";
import FileInfoPanel from "@/components/ArquivosPage/FileInfoPanel";
import PdfViewer from "@/components/ArquivosPage/PdfViewer";
import { AuthContext } from "@/context/AuthContext";
import { useGetFileBinaries, useGetFileMetadata } from "@/hooks/arquivos";
import { Container, Grid } from "@mui/material";
import { GetServerSidePropsContext } from "next";
import { useContext } from "react";
import { parseCookies } from "nookies";

export default function Arquivo({ fileId }: { fileId: string }) {
  const { userData } = useContext(AuthContext);

  const { data: file, isLoading: isLoadingFile } = useGetFileMetadata(fileId);

  const { data: url } = useGetFileBinaries(fileId)

  return (
    <Container sx={{ mt: 2, overflow: "hidden", pb: 10 }}>
      {isLoadingFile ? <PageTitle title="Carregando..." hasBackButton /> : <PageTitle title={`${file?.filename}${file?.metadata.emRevisao ? " - em revisão" : ""}`} hasBackButton />}
      <Grid
        container
        columnGap={1}
        sx={{ height: "100vh", position: "relative", justifyContent: "space-between" }}
      >
        <Grid item xs={true}>
          {url && !isLoadingFile && <PdfViewer url={url} />}
        </Grid>

        <Grid item xs={3}>
          {!isLoadingFile && <FileInfoPanel file={file} userData={userData} fileUrl={url} />}
        </Grid>
      </Grid>
    </Container>
  );
}

export function getServerSideProps(context: GetServerSidePropsContext) {
  const { query } = context;

  const cookies = parseCookies(context);

  if (cookies.client_tipo === undefined) {
    return {
      redirect: {
        destination: "/",
        permanent: false
      }
    }
  }

  return {
    props: {
      fileId: query.id,
    },
  };
}
