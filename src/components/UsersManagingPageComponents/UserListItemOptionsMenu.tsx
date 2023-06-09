import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState, MouseEvent, useContext } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { UserCRUDContext } from "@/contexts/UserCrudContext";
import AddUserToProjectsModal from "./AddUserToProjectsModal";
import Link from "next/link";

export default function UserListItemOptionsMenu({
  userData,
}: {
  userData: {
    nome: string | undefined;
    id: string | undefined;
    projetos: { nome: string; id: string }[] | undefined;
  };
}) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const [addUserToProjectsModalState, setAddUserToProjectsModalState] = useState(false);

  function openAddUserToProjectsModal() {
    setAddUserToProjectsModalState(true);
    handleCloseMenu();
  }

  function closeAddUserToProjectsModal() {
    setAddUserToProjectsModalState(false);
  }

  function handleClickMenu(event: MouseEvent<HTMLButtonElement>) {
    setAnchorEl(event.currentTarget);
  }

  function handleCloseMenu() {
    setAnchorEl(null);
  }

  const { deleteUser } = useContext(UserCRUDContext);

  function handleDeleteUser() {
    deleteUser((userData.id as string));
    handleCloseMenu();
  }

  return (
    <>
      {addUserToProjectsModalState && (
        <AddUserToProjectsModal
          isOpen={addUserToProjectsModalState}
          close={closeAddUserToProjectsModal}
          userData={userData}
          projetos={userData.projetos}
        />
      )}
      <Button
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClickMenu}
        sx={{ padding: 0, minWidth: "auto" }}
      >
        <MoreHorizIcon />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: "center", horizontal: "center" }}
      >
        <MenuItem onClick={openAddUserToProjectsModal}>Adicionar a projetos</MenuItem>
        <MenuItem>
          <Link href={`./users/${userData.id}`} >Detalhes</Link>
        </MenuItem>
        <MenuItem onClick={handleDeleteUser}>Excluir</MenuItem>
      </Menu>
    </>
  );
}
