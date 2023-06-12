import FilesList from "@/components/FilesPageComponents/FilesList";
import styled from "@emotion/styled";
import FilesToolbar from "@/components/FilesPageComponents/FilesToolbar";
import { GetServerSidePropsContext } from "next";
import { useQuery } from "@tanstack/react-query";

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function FilesPage({ projetoID }: any) {
  const { data, isLoading } = useQuery({
    queryKey: ["Arquivos-do-projeto"],
    queryFn: getProjectFiles,
    refetchOnWindowFocus: false,
  });

  async function getProjectFiles() {
    const data = await fetch("/api/files/getAllFilesFromProject", {method: "POST", body: projetoID}).then(res => res.json())
    return data
  }

  if (data === undefined) {
    return (
      <StyledDiv>
        <FilesToolbar projectId={projetoID} projectName={"Carregando..."} />
          <div>Carregando</div>
      </StyledDiv>
    );
  }

  if (data.projectName) {//se retornar apenas o nome do projeto é porque não tem arquivos daquele projeto ainda
    
    return (
      <StyledDiv>
        <FilesToolbar projectId={projetoID} projectName={data.projectName} />
          <div>Não existem arquivos nesse projeto ainda.</div>
      </StyledDiv>
    );
  }

  return (
    <StyledDiv>
      <FilesToolbar projectId={projetoID} projectName={data[0].projeto.nome}/>
        {isLoading ? null : <FilesList files={data} />}
    </StyledDiv>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { query } = context;

  return {
    props: {
      projetoID: query.projetoID,
    },
  };
}
