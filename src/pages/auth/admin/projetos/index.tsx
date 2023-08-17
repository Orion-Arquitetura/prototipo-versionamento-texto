import ProjetosManagingToolbar from "@/components/ProjetosManagingPage/ProjetosManagingToolbar";
import ProjectsList from "@/components/ProjetosManagingPage/ProjectsListAdmin";
import { Container } from "@mui/material";

export default function Projetos() {
    return (
        <Container sx={{ mt: 2 }}>
            <ProjetosManagingToolbar />
            <ProjectsList />
        </Container>
    )
}