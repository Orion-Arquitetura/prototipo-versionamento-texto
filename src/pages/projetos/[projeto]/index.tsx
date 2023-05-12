import Arquivo from "@/database/models/arquivoModel";
import FilesList from "@/components/FilesList";
import styled from "@emotion/styled";
import FilesFilters from "@/components/FilesFilters";
import BackButton from "@/components/BackButton";

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
      <BackButton />
      <div className="filters-and-files">
        <FilesFilters />
        <FilesList files={JSON.parse(projeto.arquivos)} />
      </div>
    </StyledDiv>
  );
}

export async function getServerSideProps(context: any) {
  const { query } = context;
  const projectId = query.projeto;

  const data = await Arquivo.find({ projeto: projectId })
    .exec()
    .then((res) => res);

  return {
    props: {
      projeto: {
        arquivos: JSON.stringify(data),
      },
    },
  };
}
