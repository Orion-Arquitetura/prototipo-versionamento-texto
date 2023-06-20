import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
} from "@mui/material";
import styled from "@emotion/styled";
import PeopleIcon from "@mui/icons-material/People";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import Link from "next/link";

const StyledPaper = styled(Paper)`
  margin-top: 20px;
  width: 30%;
`;

const StyledButton = styled(ListItemButton)`
  position: relative;
  padding: 0;

  a {
    width: 100%;
    display: flex;
    align-items: center;
    padding: 8px 16px;
  }
`;

export default function PanelMenu() {
  return (
    <StyledPaper>
      <List>
        <StyledButton>
          <Link href="/admin/users">
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Usuários" />
          </Link>
        </StyledButton>

        <StyledButton>
          <Link href="/admin/projetos">
            <ListItemIcon>
              <BusinessCenterIcon />
            </ListItemIcon>
            <ListItemText primary="Projetos" />
          </Link>
        </StyledButton>
      </List>
    </StyledPaper>
  );
}
