import Arquivo from "@/database/models/arquivoModel";
import FilesList from "@/components/FilesList";
import styled from "@emotion/styled";
import FilesFilters from "@/components/FilesFilters";
import BackButton from "@/components/BackButton";
import AddFile from "@/components/AddFile";
import PageTitle from "@/components/PageTitle";
import { GetServerSidePropsContext } from "next";
import Projeto from "@/database/models/projectModel";
import FilesToolbar from "@/components/FilesToolbar";

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;

  .filters-and-files {
    display: flex;
    column-gap: 1%;
  }
`;

export default function Disciplinas({ projeto }: any) {
  console.log(projeto);
  return (
    <StyledDiv>
      <PageTitle title={projeto.nome} />
      <FilesToolbar />
      <div className="filters-and-files">
        <FilesFilters />
        <FilesList files={JSON.parse(projeto.arquivos)} />
      </div>
    </StyledDiv>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { query } = context;
  const projectId = query.projeto;

  const files = await Arquivo.find({ projeto: projectId })
    .exec()
    .then((res) => res);

  const projectName = await Projeto.findOne({ _id: query.projeto })
    .exec()
    .then((res) => res.nome);

  return {
    props: {
      projeto: {
        nome: projectName,
        arquivos: JSON.stringify(files),
      },
    },
  };
}
