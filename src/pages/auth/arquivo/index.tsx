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
  const { authData } = useContext(AuthContext);

  const { data: file, isLoading: isLoadingFile } = useGetFileMetadata(fileId);

  const { data: url } = useGetFileBinaries(fileId)

  return (
    <Container sx={{ mt: 2, overflow: "hidden", pb: 10 }}>
      <PageTitle title={`${file?.filename}${file?.metadata.emRevisao ? " - em revisão" : ""}`} hasBackButton />
      <Grid
        container
        columnGap={2}
        sx={{ height: "100vh", position: "relative", justifyContent: "space-between" }}
      >
        <Grid item xs={9}>
          {url && !isLoadingFile && <PdfViewer url={url} />}
        </Grid>

        <Grid item xs={true}>
          {!isLoadingFile && <FileInfoPanel file={file} userData={authData} />}
        </Grid>
      </Grid>
    </Container>
  );
}

export function getServerSideProps(context: GetServerSidePropsContext) {
  const { query } = context;

  const cookies = parseCookies(context);

  if (!cookies.token) {
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
