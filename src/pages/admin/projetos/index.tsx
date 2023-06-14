import { Box } from "@mui/material";
import styled from "@emotion/styled";
import ProjectsList from "@/components/ProjectsManagingPageComponents/ProjectsList";
import PageTitle from "@/components/PageTitle";

const StyledBox = styled(Box)``;

export default function Projetos() {
  return (
    <>
    <PageTitle title="Gerenciar projetos" />
      <StyledBox mt={2}>
        <ProjectsList />
      </StyledBox>
    </>
  );
}
