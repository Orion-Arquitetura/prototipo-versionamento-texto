import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState, MouseEvent } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import AddUserToProjectModal from "./AddUserToProjectModal";

export default function UserListItemOptionsMenu({ userId, userName, userProjects }:any) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClickMenu = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const [addUserToProjectModalState, setAddUserToProjectModalState] = useState(false);

  function openAddUserToProjectModal() {
    handleCloseMenu();
    setAddUserToProjectModalState(true);
  }

  function closeAddUserToProjectModal() {
    setAddUserToProjectModalState(false);
  }

  return (
    <div>
      <AddUserToProjectModal
        isOpen={addUserToProjectModalState}
        handleCloseModal={closeAddUserToProjectModal}
        userId={userId}
        userName={userName}
        userProjects={userProjects}
      />
      <Button
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClickMenu}
      >
        <MoreHorizIcon />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleCloseMenu}
      >
        <MenuItem onClick={openAddUserToProjectModal}>Adicionar a um projeto</MenuItem>
        <MenuItem onClick={handleCloseMenu}>Modificar permissoes</MenuItem>
        <MenuItem onClick={handleCloseMenu}>Excluir</MenuItem>
      </Menu>
    </div>
  );
}
