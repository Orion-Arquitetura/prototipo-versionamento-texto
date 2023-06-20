import { Box, List, ListItem } from "@mui/material";
import styled from "@emotion/styled";
import DeleteIcon from "@mui/icons-material/Delete";
const StyledList = styled(List)`
`;

export default function ProjectUsersList({ users }: any) {
  return (
    <StyledList>
      {users.length > 0 &&
        users.map((user: any) => (
          <ListItem key={user.nome} sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
            <Box>{user.nome}</Box>
            <Box>
              <DeleteIcon />
            </Box>
          </ListItem>
        ))}

      {users.length === 0 && <p>Ainda não existem usuários nesse projeto</p>}
    </StyledList>
  );
}
