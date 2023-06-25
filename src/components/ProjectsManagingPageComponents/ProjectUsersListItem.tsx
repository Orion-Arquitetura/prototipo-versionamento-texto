import { ListItem, Box, Button } from "@mui/material";
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
          p: 1.5,
          "& button": {visibility: "hidden"}, "&:hover": {"& button": {visibility: "visible"}}
        }}
      >
        <Box>{user.nome}</Box>

        <Button
          sx={{ minWidth: "auto", padding: 0 }}
          onClick={openRemoveUserFromProjectModal}
        >
          <DeleteIcon sx={{color: "white"}} />
        </Button>
      </ListItem>
    </>
  );
}
