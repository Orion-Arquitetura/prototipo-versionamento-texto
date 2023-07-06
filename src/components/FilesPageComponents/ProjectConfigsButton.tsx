import { Button } from "@mui/material";
import styled from "@emotion/styled";
import SettingsIcon from "@mui/icons-material/Settings";
import Link from "next/link";

const StyledButton = styled(Button)`
  a {
    height: 24px;
  }
`;

export default function ProjectConfigsButton({ projectId, projectName }: { projectId: string, projectName:string }) {
  return (
    <Link href={{
        pathname: "/admin/projetos/configs",
        query: {id: projectId, nome: projectName}
    }}>
      <StyledButton
        sx={{
          backgroundColor: "var(--gray5)",
          ":hover": { backgroundColor: "var(--gray1)" },
        }}
        variant="contained"
        title="Configurações"
      >
        <SettingsIcon />
      </StyledButton>
    </Link>
  );
}
