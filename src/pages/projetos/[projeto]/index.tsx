import FilesList from "@/components/FilesList";
import styled from "@emotion/styled";
import FilesFilters from "@/components/FilesFilters";
import PageTitle from "@/components/PageTitle";
import Projeto from "@/database/models/projectModel";
import FilesToolbar from "@/components/FilesToolbar";
import { GetServerSidePropsContext } from "next";
import Arquivo from "@/database/models/arquivoModel";
import { useQuery } from "@tanstack/react-query";

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;

  .filters-and-files {
    display: flex;
    column-gap: 1%;
  }
`;

export default function Disciplinas({ projeto }: any) {
  const { data, isLoading } = useQuery({
    queryKey: ["Arquivos-do-projeto"],
    queryFn: getProjectFiles,
    refetchOnWindowFocus: false,
  });

  async function getProjectFiles() {
    const data = await fetch("/api/files/getAllFilesFromProject", {method: "POST", body: projeto.id}).then(res => res.json())
    return data
  }

  return (
    <StyledDiv>
      <PageTitle title={projeto.nome} />
      <FilesToolbar projectId={projeto.id} />
      <div className="filters-and-files">
        <FilesFilters />
        {isLoading ? null : <FilesList files={data} />}
      </div>
    </StyledDiv>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { query } = context;

  const projectData = await Projeto.findOne({ _id: query.projeto })
    .exec()
    .then((res) => res);

  return {
    props: {
      projeto: {
        nome: projectData.nome,
        id: JSON.stringify(projectData._id).replace(/"/g, ""),
      },
    },
  };
}
