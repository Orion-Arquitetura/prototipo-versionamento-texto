import {
  Paper,
  Modal,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Box,
  Button,
} from "@mui/material";
import styled from "@emotion/styled";
import { useContext } from "react";
import { UserCRUDContext } from "@/contexts/UserCrudContext";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FileCRUDContext } from "@/contexts/FileCrudContext";

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

  input[type="date"] {
    padding-inline: 10px;
  }
`;

export default function RevisaoModal({ close, isOpen, file }) {
  const { getAllUsers } = useContext(UserCRUDContext);
  const { requestFileRevision } = useContext(FileCRUDContext);
  const [usuarioSelecionado, setUsuarioSelecionado] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setUsuarioSelecionado(event.target.value as string);
  };
  const { data: users, isLoading } = useQuery({
    queryKey: ["get-all-users"],
    queryFn: getAllUsers,
    refetchOnWindowFocus: false,
  });

  function handleRequestFileRevision() {}

  return (
    <Modal
      onClose={close}
      open={isOpen}
    >
      <StyledPaper>
        <h3>Solicitar revisão</h3>

        <Box sx={{ display: "flex", justifyContent: "space-around" }}>
          <FormControl sx={{ width: "50%" }}>
            <InputLabel>Usuário</InputLabel>
            <Select
              value={usuarioSelecionado}
              label="Usuário"
              onChange={handleChange}
            >
              {users?.map((user) => {
                return (
                  <MenuItem
                    key={user._id}
                    value={user._id}
                  >
                    {user.nome}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <input type="date" />
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
