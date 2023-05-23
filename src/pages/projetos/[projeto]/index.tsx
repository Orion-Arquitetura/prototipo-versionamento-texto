import FilesList from "@/components/FilesList";
import styled from "@emotion/styled";
import FilesFilters from "@/components/FilesFilters";
import PageTitle from "@/components/PageTitle";
import Projeto from "@/database/models/projectModel";
import FilesToolbar from "@/components/FilesToolbar";
import { GetServerSidePropsContext } from "next";
import Arquivo from "@/database/models/arquivoModel";

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;

  .filters-and-files {
    display: flex;
    column-gap: 1%;
  }
`;

export default function Disciplinas({ projeto }: any) {
  return (
    <StyledDiv>
      <PageTitle title={projeto.nome} />
      <FilesToolbar projectId={projeto.id} />
      <div className="filters-and-files">
        <FilesFilters />
        <FilesList files={JSON.parse(projeto.arquivos)} />
      </div>
    </StyledDiv>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { query } = context;

  const projectData = await Projeto.findOne({ _id: query.projeto })
    .exec()
    .then((res) => res);

  const arquivos = await Arquivo.find({projeto: projectData._id}).then(res => res)
  console.log(arquivos)
  console.log(projectData)

  return {
    props: {
      projeto: {
        nome: projectData.nome,
        id: JSON.stringify(projectData._id),
        arquivos: JSON.stringify(arquivos)
      },
    },
  };
}
