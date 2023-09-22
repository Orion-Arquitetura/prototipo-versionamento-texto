import PageTitle from "@/components/PageTitle";
import { Container, List, ListItemButton } from "@mui/material";
import { GetServerSidePropsContext } from "next";
import { parseCookies } from "nookies";
import PeopleIcon from "@mui/icons-material/People";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import Link from "next/link";
import styled from "@emotion/styled"
import { theme } from "@/theme/theme";

const StyledListItem = styled(ListItemButton)`
    display: flex;
    column-gap: 10px;
    background-color: ${theme.palette.primary.main};
    color: white;
    padding: 10px;

    &:hover {
        background-color: ${theme.palette.secondary.main};
    }
`

export default function AdminPage() {
    return (
        <Container sx={{ mt: 2 }}>
            <PageTitle
                title="Painel do administrador"
                hasBackButton
            />
            <List sx={{ display: "flex", flexDirection: "column", rowGap: 1 }}>
                <StyledListItem LinkComponent={Link} href="/auth/admin/usuarios">
                    <PeopleIcon />
                    Usuários
                </StyledListItem>
                <StyledListItem LinkComponent={Link} href="/auth/admin/projetos">
                    <BusinessCenterIcon />
                    Projetos
                </StyledListItem>
            </List>
        </Container>
    )
}