import styled from "@emotion/styled";
import { Box, Button, Modal, Paper } from "@mui/material";

const StyledPaper = styled(Paper)`
  width: fit-content;
  margin: auto;
  position: relative;
  top: 50%;
  padding: 50px;
  translate: 0% -50%;
  text-align: center;

  & div {
    margin-top: 20px;
    display: flex;
    justify-content: space-around;
  }
`;

interface DeleteFileModalType {
  close: () => void;
  isOpen: boolean;
  handleDeleteFile: () => void;
}

export default function DeleteFileModal({
  close,
  isOpen,
  handleDeleteFile,
}:DeleteFileModalType) {
  return (
    <Modal
      open={isOpen}
      onClose={close}
    >
      <StyledPaper>
        Confirma que deseja excluir o arquivo?
        <Box>
          <Button
            variant="contained"
            onClick={handleDeleteFile}
          >
            Sim, excluir
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={close}
          >
            Cancelar
          </Button>
        </Box>
      </StyledPaper>
    </Modal>
  );
}
