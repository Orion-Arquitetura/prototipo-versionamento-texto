import FilesList from "@/components/FilesPageComponents/FilesList";
import styled from "@emotion/styled";
import FilesToolbar from "@/components/FilesPageComponents/FilesToolbar";
import { GetServerSidePropsContext } from "next";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { FileCRUDContext } from "@/contexts/FileCrudContext";

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function FilesPage({ projetoID }: any) {
  const { getProjectFiles } = useContext(FileCRUDContext);

  const { data, isLoading } = useQuery({
    queryKey: ["Arquivos-do-projeto"],
    queryFn: () => getProjectFiles(projetoID),
    refetchOnWindowFocus: false,
  });

  if (!isLoading) {
    console.log(data)
  }

  if (data === undefined) {
    return (
      <StyledDiv>
        <FilesToolbar
          projectId={projetoID}
          projectName={"Carregando..."}
        />
        <div>Carregando</div>
      </StyledDiv>
    );
  }

  if (data.projectName) {
    //se retornar apenas o nome do projeto é porque não tem arquivos daquele projeto ainda

    return (
      <StyledDiv>
        <FilesToolbar
          projectId={projetoID}
          projectName={data.projectName}
        />
        <div>Não existem arquivos nesse projeto ainda.</div>
      </StyledDiv>
    );
  }

  return (
    <StyledDiv>
      <FilesToolbar
        projectId={projetoID}
        projectName={data[0].projeto.nome}
      />
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
