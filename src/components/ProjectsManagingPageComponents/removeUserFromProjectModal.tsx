import { ProjectCRUDContext } from "@/contexts/ProjectCrudContext";
import styled from "@emotion/styled";
import { Box, Button, Modal, Paper } from "@mui/material";
import { useContext } from "react";

const StyledPaper = styled(Paper)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #f5f5f5;
  height: 350px;
  box-shadow: 0px 0px 24px rgba(0, 0, 0, 0.5);
  padding: 16px;
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  height: fit-content;
  align-items: center;
`;

export default function RemoveUserModal({
  removeUserFromProjectModalIsOpen,
  closeModal,
  projectId,
  userId,
}: any) {
  const { removeUserFromProject } = useContext(ProjectCRUDContext);

  function handleRemoveUserFromProject() {
    removeUserFromProject(projectId, userId);
    closeModal();
  }
  return (
    <Modal
      open={removeUserFromProjectModalIsOpen}
      onClose={closeModal}
    >
      <StyledPaper>
        <h3>Confirmar remoção de usuário do projeto</h3>
        <Box sx={{ display: "flex", columnGap: "10px" }}>
          <Button
            variant="contained"
            color="success"
            onClick={handleRemoveUserFromProject}
          >
            Sim
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={closeModal}
          >
            Não
          </Button>
        </Box>
      </StyledPaper>
    </Modal>
  );
}
