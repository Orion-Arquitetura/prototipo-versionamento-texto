import { Paper, Modal, Box, Button, TextField } from "@mui/material";
import styled from "@emotion/styled";
import { Arquivo } from "@/utils/interfaces";
import { useState } from "react";

const StyledPaper = styled(Paper)`
  width: 50%;
  margin: auto;
  position: relative;
  top: 50%;
  padding: 20px;
  translate: 0% -50%;
  text-align: center;
  display: flex;
  flex-direction: column;
  row-gap: 20px;
`;

export default function SendFileRevisionModal({
  close,
  isOpen,
  file,
}: {
  close: () => void;
  isOpen: boolean;
  file: Arquivo;
}) {
  function handleSendFileRevision() {}
  const [revisionText, setRevisionText] = useState("");

  return (
    <Modal
      onClose={close}
      open={isOpen}
    >
      <StyledPaper>
        <h3>Enviar revisão</h3>

        <Box sx={{ display: "flex", justifyContent: "space-around" }}>
          <TextField
            onChange={(ev) => setRevisionText(ev.target.value)}
            multiline
            minRows={5}
            maxRows={10}
            fullWidth
            placeholder="Escreva aqui detalhes da revisão."
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            width: "fit-content",
            marginInline: "auto",
            columnGap: "15px",
          }}
        >
          <Button
            variant="contained"
            color="success"
            onClick={handleSendFileRevision}
            disabled={revisionText === "" ? true : false}
          >
            Confirmar
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
