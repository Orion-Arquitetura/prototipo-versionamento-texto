import { Box } from "@mui/material";
import PageTitle from "../PageTitle";
import AddUserButton from "./AddUserButton";


export default function UsersManagingToolbar() {
    return (
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <PageTitle title="Gerenciar usuários" hasBackButton />
            <AddUserButton />
        </Box>
    )
}