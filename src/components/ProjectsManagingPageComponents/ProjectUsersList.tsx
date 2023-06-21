import { List } from "@mui/material";
import styled from "@emotion/styled";
import ProjectUsersListItem from "./ProjectUsersListItem";

const StyledList = styled(List)`
  border-radius: 4px;
  overflow: hidden;
  padding: 0;
  display: flex;
  flex-direction: column;
  row-gap: 1px;
`;

export default function ProjectUsersList({ users, projectData }: any) {
  return (
    <StyledList>
      {users.length > 0 &&
        users.map((user: any) => (
          <ProjectUsersListItem
            key={user.nome}
            user={user}
            projectId={projectData._id}
          />
        ))}

      {users.length === 0 && <p>Ainda não existem usuários nesse projeto</p>}
    </StyledList>
  );
}
