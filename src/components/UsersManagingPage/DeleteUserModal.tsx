import { useDeleteUser } from "@/hooks/user";
import { ClienteUser, FuncionarioUser } from "@/utils/types";
import { Box, Button, Modal, Paper, Typography } from "@mui/material";
import Router from "next/router";

export default function DeleteUserModal({
  open,
  handleClose,
  user,
}: {
  open: boolean;
  handleClose: () => void;
  user: ClienteUser | FuncionarioUser;
}) {
  const { mutate: deleteUser } = useDeleteUser();

  function handleDeleteUser() {
    deleteUser(user._id);
    Router.replace("/auth/admin/usuarios");
  }

  return (
    <Modal open={open} onClose={handleClose} sx={{ display: "grid", placeItems: "center" }}>
      <Paper
        elevation={8}
        sx={{
          width: "30%",
          p: 3,
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
          rowGap: 2,
          textAlign: "center",
        }}
      >
        <Typography variant="h6">Tem certeza que dejesa excluir o usuario {user.nome}?</Typography>
        <Typography variant="body1">
          Todos os dados relacionados a esse usuário também serão excluídos
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button variant="contained" color="error" onClick={handleDeleteUser}>
            Sim, excluir
          </Button>
          <Button variant="contained" onClick={handleClose}>
            Cancelar
          </Button>
        </Box>
      </Paper>
    </Modal>
  );
}
