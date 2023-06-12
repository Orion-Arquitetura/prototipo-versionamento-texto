import { List, ListItemButton, ListItemIcon, ListItemText, Paper } from "@mui/material";
import styled from "@emotion/styled";
import PeopleIcon from "@mui/icons-material/People";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import Link from "next/link";

const StyledPaper = styled(Paper)`
  margin-top: 20px;
  width: 30%;
`;

export default function PanelMenu() {
  return (
    <StyledPaper>
      <List>
        <ListItemButton
          LinkComponent={Link}
          href="/admin/users"
        >
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Usuários" />
        </ListItemButton>

        <ListItemButton
          LinkComponent={Link}
          href="/admin/projetos"
        >
          <ListItemIcon>
            <BusinessCenterIcon />
          </ListItemIcon>
          <ListItemText primary="Projetos" />
        </ListItemButton>
      </List>
    </StyledPaper>
  );
}
