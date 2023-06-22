import { Box } from "@mui/material";
import styled from "@emotion/styled";
import ProjectsList from "@/components/ProjectsManagingPageComponents/ProjectsList";
import PageTitle from "@/components/PageTitle";
import ProjectsToolbar from "@/components/ProjectsManagingPageComponents/ProjectsToolbar";

const StyledBox = styled(Box)``;

export default function Projetos() {
  return (
    <>
    <ProjectsToolbar />
      <StyledBox mt={2}>
        <ProjectsList />
      </StyledBox>
    </>
  );
}
