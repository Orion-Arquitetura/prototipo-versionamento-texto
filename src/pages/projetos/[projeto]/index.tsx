import PageTitle from "@/components/PageTitle";
import Arquivo from "@/database/models/arquivoModel";
import FilesList from "@/components/FilesList";
import FilesFiltersContextProvider from "@/contexts/filesFiltersContext";
import styled from "@emotion/styled";
import FilesFilters from "@/components/FilesFilters";
import { FilesFiltersContext } from "@/contexts/filesFiltersContext";
import { useContext } from "react";
import ActiveFilters from "@/components/ActiveFilters";

const StyledDiv = styled.div`
  .filterAndListDiv {
    display: flex;
  }
`;

export default function Disciplinas({ projeto }: any) {
  const { filesFilters } = useContext(FilesFiltersContext);
  return (
    <StyledDiv>
      <FilesFiltersContextProvider>
        <PageTitle title={"Selecione o tipo de arquivo"} />
        <ActiveFilters filters={filesFilters} />
        <div className="filterAndListDiv">
          <FilesFilters />
          <FilesList files={JSON.parse(projeto.arquivos)} />
        </div>
      </FilesFiltersContextProvider>
    </StyledDiv>
  );
}

export async function getServerSideProps(context: any) {
  const { query } = context;
  const projectId = query.projeto;

  const data = await Arquivo.find({ projeto: projectId })
    .exec()
    .then((res) => res);

  console.log(data);
  return {
    props: {
      projeto: {
        arquivos: JSON.stringify(data),
      },
    },
  };
}
