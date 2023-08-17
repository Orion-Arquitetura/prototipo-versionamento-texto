import { useGetProjects } from "@/hooks/projetos";
import { Projeto } from "@/utils/types";
import { List } from "@mui/material";
import ProjectsListItem from "./ProjectsListItem";


export default function ProjectsList() {
    const { data: projetos, isLoading } = useGetProjects();

    console.log(projetos)

    return (
        <List sx={{display: "flex", flexDirection: "column", rowGap: 1}}>
            {!isLoading && projetos.map((projeto: Projeto) => {
                return <ProjectsListItem key={projeto._id} projeto={projeto} />
            })}
        </List>
    )
}