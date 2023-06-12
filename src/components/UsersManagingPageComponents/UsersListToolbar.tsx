import styled from "@emotion/styled";
import { Box, Button } from "@mui/material";
import { useState } from "react";
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
  

  function openAddUserModal() {
    setAddUserModalState(true);
  }

  function closeAddUserModal() {
    setAddUserModalState(false);
  }



  return (
    <StyledDiv>
      <PageTitle title={"Controle de usuários"} />

      <Box sx={{ display: "flex", columnGap: 2 }}>
        <Button
          variant="contained"
          onClick={openAddUserModal}
        >
          Add user
        </Button>
        <AddUserModal
          isOpen={addUserModalState}
          handleClose={closeAddUserModal}
        />
      </Box>
    </StyledDiv>
  );
}
