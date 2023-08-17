import { Box } from "@mui/material";
import PageTitle from "../PageTitle";
import AddProjectButton from "./AddProjectButton";


export default function ProjetosManagingToolbar() {
    return (
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <PageTitle title="Gerenciar projetos" hasBackButton />
            <AddProjectButton />
        </Box>
    )
}