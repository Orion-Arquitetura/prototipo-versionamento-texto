import { useDeleteUser } from "@/hooks/user";
import projetos from "@/pages/auth/projetos";
import { Button, Menu, MenuItem, Typography } from "@mui/material";
import Link from "next/link";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useState } from "react";
import { FuncionarioUser, ClienteUser } from "@/utils/types";
import DeleteUserModal from "./DeleteUserModal";

export default function UsersListItemOptions({ user }: { user: FuncionarioUser | ClienteUser }) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const [deleteUserModalState, setDeleteUserModalState] = useState(false);

  function openDeleteUserModalState() {
    setDeleteUserModalState(true);
    handleCloseMenu()
  }

  function closeDeleteUserModalState() {
    setDeleteUserModalState(false);
  }

  function handleClickMenu(event: any) {
    setAnchorEl(event.currentTarget);
  }

  function handleCloseMenu() {
    setAnchorEl(null);
  }

  return (
    <>
      <DeleteUserModal
        open={deleteUserModalState}
        handleClose={closeDeleteUserModalState}
        user={user}
      />
      <Button onClick={handleClickMenu} sx={{ padding: 0, color: "white" }}>
        <MoreHorizIcon />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: "center", horizontal: "left" }}
      >
        <MenuItem sx={{ p: 0 }}>
          <Link
            href={{
              pathname: `/auth/admin/usuarios/usuario`,
              query: { id: user._id, type: user.tipo },
            }}
            style={{ padding: "8px", paddingLeft: "16px", width: "100%" }}
          >
            <Typography>Detalhes</Typography>
          </Link>
        </MenuItem>
        <MenuItem onClick={openDeleteUserModalState}>Excluir</MenuItem>
      </Menu>
    </>
  );
}
