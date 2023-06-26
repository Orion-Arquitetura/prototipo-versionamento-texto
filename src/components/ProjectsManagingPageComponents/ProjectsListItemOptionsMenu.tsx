import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState, MouseEvent, useContext } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Router from "next/router";
import Link from "next/link";
import { ProjectCRUDContext } from "@/contexts/ProjectCrudContext";

export default function ProjectsListItemOptionsMenu({
  id,
  nome,
}: {
  id: string;
  nome: string;
}) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const { deleteProject } = useContext(ProjectCRUDContext);

  async function hadleDeleteProject() {
    console.log(id)
    handleCloseMenu()
    await deleteProject(id);
  }

  function handleClickMenu(event: MouseEvent<HTMLButtonElement>) {
    setAnchorEl(event.currentTarget);
  }

  function handleCloseMenu() {
    setAnchorEl(null);
  }

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
        <MenuItem onClick={handleCloseMenu}>
          <Link
            href={{
              pathname: "/admin/projetos/configs",
              query: { id, nome },
            }}
          >
            Configurações
          </Link>
        </MenuItem>
        <MenuItem onClick={hadleDeleteProject}>Excluir</MenuItem>
      </Menu>
    </div>
  );
}
