import PageTitle from "@/components/PageTitle";
import { useQuery } from "@tanstack/react-query";
import VersionFilesList from "@/components/VersionFilesList";
import FileStatus from "@/components/FileStatus";
import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import { useContext } from "react";
import FileContextProvider, { FileContext } from "@/contexts/fileContext";
import FileUploadDownloadArea from "@/components/FileUploadDownloadArea";
import Loading from "@/components/Loading";

const StyledBox = styled(Box)`
  display: flex;
  justify-content: space-between;
`;

export default function Disciplina({projeto, disciplina}:any) {
  const { changeSelectedVersionFile } = useContext(FileContext);

  const { data, isLoading } = useQuery({
    queryKey: ["versoes"],
    queryFn: getDisciplineVersionFiles,
  });

  async function getDisciplineVersionFiles() {
    const url = `/api/getProjectsData/getDisciplineVersionFiles?project_name=${projeto}&discipline_name=${disciplina}`;
    const data = await fetch(url).then((res) => res.json());
    return data;
  }

  function corrigirString(string:string) {
    let comAcentos = ["hidraulica", "eletrica"];
    
    if (comAcentos.find(el => el === string)) {
      return string === "hidraulica" ? "Hidráulica" : "Elétrica" 
    }

    if (string === "cftv") {
      return "CFTV"
    }

    return string[0].toUpperCase() + string.slice(1)
  }

  if (isLoading) {
    return <Loading />
  }

  return (
        <>
          <PageTitle title={projeto.toUpperCase() + " - " + corrigirString(disciplina)} />
          <StyledBox>
            <VersionFilesList list={data} />
            <FileStatus />
            <FileUploadDownloadArea />
          </StyledBox>
        </>
  );
}

export async function getServerSideProps(context: any) {
  const { params } = context;
  
  return {
    props: {
      projeto: params.projeto,
      disciplina: params.disciplina
    },
  };
}
