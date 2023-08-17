import { Box } from "@mui/material";
import PageTitle from "../PageTitle";
import AddFileButton from "./AddFileButton";
import { Projeto } from "@/utils/types";

export default function ProjectsPageToolbar({project}:{project:Projeto}) {


    return (
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <PageTitle title={project.nome} hasBackButton />
            <AddFileButton project={project} />
        </Box>
    )
}