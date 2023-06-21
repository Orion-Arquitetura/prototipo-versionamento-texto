import { ListItem, Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import RemoveUserModal from "./removeUserFromProjectModal";

export default function ProjectUsersListItem({ user, projectId }: any) {
  const [removeUserFromProjectModalIsOpen, setRemoveUserFromProjectModalState] =
    useState(false);

  function openRemoveUserFromProjectModal() {
    setRemoveUserFromProjectModalState(true);
  }

  function closeRemoveUserFromProjectModal() {
    setRemoveUserFromProjectModalState(false);
  }

  return (
    <>
      <RemoveUserModal
        removeUserFromProjectModalIsOpen={removeUserFromProjectModalIsOpen}
        closeModal={closeRemoveUserFromProjectModal}
        projectId={projectId}
        userId={user.id}
      />
      <ListItem
        key={user.nome}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          bgcolor: "var(--midnight-green)",
          color: "white",
        }}
      >
        <Box>{user.nome}</Box>

        <Box
          sx={{ cursor: "pointer" }}
          onClick={openRemoveUserFromProjectModal}
        >
          <DeleteIcon />
        </Box>
      </ListItem>
    </>
  );
}
