import PageTitle from "@/components/PageTitle";
import PageWrapper from "@/components/PageWrapper";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { StyledSection } from "@/components/BaseSection";
import VersionFilesList from "@/components/VersionFilesList";
import FileStatus from "@/components/FileStatus";
import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import { useContext } from "react";
import FileContextProvider, { FileContext } from "@/contexts/fileContext";
import FileUploadDownloadArea from "@/components/FileUploadDownloadArea";

const StyledBox = styled(Box)`
  display: flex;
  justify-content: space-between;
`;

export default function Disciplina() {
  const { changeSelectedVersionFile } = useContext(FileContext);
  const { asPath } = useRouter();

  const regex = /\w+/g;

  const pathWays = asPath.match(regex) as RegExpMatchArray;

  const { data, isLoading } = useQuery({
    queryKey: ["versoes"],
    queryFn: getDisciplineVersionFiles,
  });

  async function getDisciplineVersionFiles() {
    const url = `/api/getDisciplineVersionFiles?project_name=${pathWays[1]}&discipline_name=${pathWays[2]}`;
    const data = await fetch(url).then((res) => res.json());
    return data;
  }

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
      <PageWrapper>
        <StyledSection>
          <PageTitle title={pathWays[1].toUpperCase() + " - " + data.disciplina} />
          <StyledBox>
            <VersionFilesList list={data} />
            <FileStatus />
            <FileUploadDownloadArea />
          </StyledBox>
        </StyledSection>
      </PageWrapper>
  );
}
