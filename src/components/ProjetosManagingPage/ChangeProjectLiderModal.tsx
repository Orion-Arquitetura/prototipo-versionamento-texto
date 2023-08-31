import { useChangeProjectLider, useRemoveProjectLider } from "@/hooks/projetos";
import { useGetFuncionarios } from "@/hooks/user";
import { Projeto } from "@/utils/types";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Modal,
  Paper,
  Typography,
  Button,
} from "@mui/material";
import { useState } from "react";

export default function ChangeProjectLiderModal({
  open,
  handleClose,
  project,
  closeMenu
}: {
  open: boolean;
  handleClose: () => void;
  project: Projeto;
  closeMenu: () => void
}) {
  const [selectedUser, setSelectedUser] = useState<{
    nome: string;
    _id: string;
  } | null>(null);

  const { data: users, isLoading } = useGetFuncionarios();
  const { mutate: changeProjectLider } = useChangeProjectLider();

  const projectLider = project.usuarios.lider

  function handleChangeProjectLider() {
    changeProjectLider({ user: selectedUser, project });
    handleClose();
  }

  if (isLoading) {
    return null;
  }

  function cancelSubmit() {
    setSelectedUser(null);
    closeMenu()
    handleClose();
  }

  return (
    <Modal
      open={open}
      onClose={cancelSubmit}
      sx={{ display: "grid", placeItems: "center" }}
    >
      <Paper elevation={8} sx={{ p: 3, width: "30%" }}>
        <Typography mb={2} variant="h6">
          Mudar líder do projeto
        </Typography>
        <FormControl fullWidth>
          <InputLabel>Funcionários</InputLabel>
          <Select
            value={selectedUser ? JSON.stringify(selectedUser) : ""}
            label="Funcionários"
            onChange={(ev) => setSelectedUser(JSON.parse(ev.target.value))}
          >
            {!isLoading &&
              users.map(({ nome, _id }: { nome: string; _id: string }) => (
                nome !== projectLider?.nome &&
                <MenuItem
                  key={nome}
                  title={nome}
                  value={JSON.stringify({ nome, _id })}
                >
                  {nome}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <Button
          sx={{ mt: 2 }}
          variant="contained"
          onClick={handleChangeProjectLider}
        >
          Enviar
        </Button>
      </Paper>
    </Modal>
  );
}
