import { useGetProjects } from "@/hooks/projetos";
import { Projeto } from "@/utils/types";
import { List, Paper } from "@mui/material";
import ProjectsListItem from "./ProjectsListItem";


export default function ProjectsList() {
    const { data: projetos, isLoading } = useGetProjects();

    if (!isLoading && projetos.length === 0) {
        return <Paper elevation={8} sx={{p:3}}>Nenhum projeto criado.</Paper>
    }

    return (
        <List sx={{display: "flex", flexDirection: "column", rowGap: 1}}>
            {!isLoading && projetos.map((projeto: Projeto) => {
                return <ProjectsListItem key={projeto._id} projeto={projeto} />
            })}
        </List>
    )
}