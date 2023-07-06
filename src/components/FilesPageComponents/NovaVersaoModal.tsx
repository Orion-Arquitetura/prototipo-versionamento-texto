import {
  Paper,
  Modal,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import styled from "@emotion/styled";
import { UserCRUDContext, UserType } from "@/contexts/UserCrudContext";
import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { FileCRUDContext } from "@/contexts/FileCrudContext";
import { Arquivo, User } from "@/utils/interfaces";

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

export default function NovaVersaoModal({
  close,
  isOpen,
  file,
}: {
  close: () => void;
  isOpen: boolean;
  file: Arquivo;
}) {
  const { getAllUsers } = useContext(UserCRUDContext);
  const { requestNewFileVersion } = useContext(FileCRUDContext);
  const [usuarioSelecionado, setUsuarioSelecionado] = useState<User | null>(null);
  const [prazo, setPrazo] = useState("");

  const { data: users, isLoading } = useQuery({
    queryKey: ["get-all-users"],
    queryFn: getAllUsers,
    refetchOnWindowFocus: false,
  });

  function handleChange(event: SelectChangeEvent) {
    const user = users?.find((user) => user._id === event.target.value) as User;
    setUsuarioSelecionado(user);
  }

  function handleRequestNewFileVersion() {
    requestNewFileVersion(file, usuarioSelecionado as User, prazo);
    close()
  }

  return (
    <Modal
      onClose={close}
      open={isOpen}
    >
      <StyledPaper>
        <h3>Solicitar nova versão</h3>
        <Box sx={{ display: "flex", justifyContent: "space-around" }}>
          <FormControl sx={{ width: "50%" }}>
            <InputLabel>Usuário</InputLabel>
            <Select
              value={usuarioSelecionado ? usuarioSelecionado._id : ""}
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
          <input
            type="date"
            onChange={(ev) => setPrazo(ev.target.value)}
            min={new Date().toISOString().split('T')[0]}
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
            onClick={handleRequestNewFileVersion}
            disabled={usuarioSelecionado === null ? true : false}
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
