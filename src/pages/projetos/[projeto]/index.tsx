import FilesList from "@/components/FilesList";
import styled from "@emotion/styled";
import Projeto from "@/database/models/projectModel";
import FilesToolbar from "@/components/FilesToolbar";
import { GetServerSidePropsContext } from "next";
import { useQuery } from "@tanstack/react-query";

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function FilesPage({ projeto }: any) {
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
      <FilesToolbar projectId={projeto.id} projectName={projeto.nome}/>
        {isLoading ? null : <FilesList files={data} />}
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
