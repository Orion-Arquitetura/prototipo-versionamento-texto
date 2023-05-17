import Arquivo from "@/database/models/arquivoModel";
import FilesList from "@/components/FilesList";
import styled from "@emotion/styled";
import FilesFilters from "@/components/FilesFilters";
import PageTitle from "@/components/PageTitle";
import Projeto from "@/database/models/projectModel";
import FilesToolbar from "@/components/FilesToolbar";
import { GetServerSidePropsContext } from "next";
import { useQuery } from "@tanstack/react-query";
import Pasta from "@/database/models/pastaModel";

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;

  .filters-and-files {
    display: flex;
    column-gap: 1%;
  }
`;

export default function Disciplinas({ projeto }: any) {
  console.log(projeto)
  return (
    <StyledDiv>
      <PageTitle title={projeto.nome} />
      <FilesToolbar projectId={projeto.id} />
      <div className="filters-and-files">
        <FilesFilters />
        <FilesList files={JSON.parse(projeto.pastas)} />
      </div>
    </StyledDiv>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { query } = context;

  const projectData = await Projeto.findOne({ _id: query.projeto })
    .exec()
    .then((res) => res);

  const folders = await Pasta.find({projeto: projectData._id}).then(res => res)

  return {
    props: {
      projeto: {
        nome: projectData.nome,
        id: JSON.stringify(projectData._id),
        pastas: JSON.stringify(folders)
      },
    },
  };
}
