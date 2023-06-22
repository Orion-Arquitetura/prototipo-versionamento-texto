import styled from "@emotion/styled";
import { useState } from "react";
import PageTitle from "../PageTitle";
import Box from "@mui/material/Box";
import AddProjectModal from "./AddProjectModal";
import { Add } from "@mui/icons-material";
import { Button } from "@mui/material";

const StyledDiv = styled.div`
  margin-bottom: 10px;
  display: flex;
  column-gap: 10px;
  max-height: 45px;
  justify-content: space-between;
`;

export default function ProjectsToolbar() {
  const [addProjectModalState, setAddProjectModalState] = useState(false);

  function openAddProjectModal() {
    setAddProjectModalState(true);
  }

  function closeAddProjectModal() {
    setAddProjectModalState(false);
  }

  return (
    <StyledDiv>
      <PageTitle title={"Gerenciar projetos"} backButton/>

      <Box sx={{display: "flex", columnGap: 2}}>
        <AddProjectModal close={closeAddProjectModal} isOpen={addProjectModalState}/>
        <Button variant="contained" onClick={openAddProjectModal}><Add /></Button>
      </Box>
    </StyledDiv>
  );
}
