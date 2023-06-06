import styled from "@emotion/styled";
import { Button, List, ListItem, ListItemButton } from "@mui/material";
import { useContext, useState } from "react";
import Link from "next/link";

const StyledDiv = styled.div`
  height: 100vh;
  padding-top: 100px;
  border: solid 1px red;
`;

export default function Index() {
  return (
    <StyledDiv>
      <List>
        <ListItem>
          <ListItemButton>
            <Link href={"/admin/users"}>Ver usuários</Link>
          </ListItemButton>
        </ListItem>
      </List>
    </StyledDiv>
  );
}
