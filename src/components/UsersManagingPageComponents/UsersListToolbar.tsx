import styled from "@emotion/styled";
import { Box } from "@mui/material";
import { useState } from "react";
import AddFileButton from "../FilesPageComponents/AddFileButton";
import PageTitle from "../PageTitle";
import AddUserModal from "./AddUserModal";

const StyledDiv = styled.div`
  margin-bottom: 10px;
  display: flex;
  column-gap: 10px;
  max-height: 45px;
  justify-content: space-between;
`;

export default function UsersListToolbar() {
  const [addUserModalState, setAddUserModalState] = useState(false);

  function openAddFileModal() {
    setAddUserModalState(true);
  }

  function closeAddUserModal() {
    setAddUserModalState(false);
  }

  return (
    <StyledDiv>
      <PageTitle title={"Controle de usuários"} />

      <Box sx={{ display: "flex", columnGap: 2 }}>
        <AddFileButton handleOpen={openAddFileModal} />
        <AddUserModal
          isOpen={addUserModalState}
          handleClose={closeAddUserModal}
        />
      </Box>
    </StyledDiv>
  );
}
