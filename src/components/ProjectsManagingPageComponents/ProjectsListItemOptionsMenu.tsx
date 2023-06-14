import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState, MouseEvent } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

export default function ProjectsListItemOptionsMenu({ userId, userName, userProjects }: any) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClickMenu = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  // const [addUserToProjectModalState, setAddUserToProjectModalState] = useState(false);

  // function openAddUserToProjectModal() {
  //   handleCloseMenu();
  //   setAddUserToProjectModalState(true);
  // }

  // function closeAddUserToProjectModal() {
  //   setAddUserToProjectModalState(false);
  // }

  return (
    <div>
      {/* {addUserToProjectModalState && (
        <AddUserToProjectModal
          isOpen={addUserToProjectModalState}
          handleCloseModal={closeAddUserToProjectModal}
          userId={userId}
          userName={userName}
          userProjects={userProjects}
        />
      )} */}
      <Button
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClickMenu}
      >
        <MoreHorizIcon />
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleCloseMenu}
      >
        <MenuItem onClick={handleCloseMenu}>Renomear</MenuItem>
        <MenuItem onClick={handleCloseMenu}>Modificar usuarios</MenuItem>
        <MenuItem onClick={handleCloseMenu}>Excluir</MenuItem>
      </Menu>
    </div>
  );
}
