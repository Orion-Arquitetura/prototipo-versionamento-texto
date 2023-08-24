import { User } from "@/utils/types";
import styled from "@emotion/styled";
import { ListItem, Typography } from "@mui/material";
import UsersListItemOptions from "./UsersListItemOptions";
import { theme } from "@/theme/theme";


const StyledListItem = styled(ListItem)`
    display: flex;
    background-color: ${theme.palette.primary.main};
    color: white;
    padding: 16px;
    border-radius: 6px;
    justify-content: space-between;
`;

function tipo(tipo: "funcionario" | "cliente" | "administrador") {
    switch (tipo) {
        case "funcionario":
            return "Funcionário"
            break
        case "cliente":
            return "Cliente"
            break
        case "administrador":
            return "Administrador"
            break
        default:
            break
    }
}

export default function UsersListItem({ user }: { user: User }) {
    return (
        <StyledListItem>
            <Typography>{user.nome} - {tipo(user.tipo)}</Typography>
            {
                user.tipo !== "administrador" &&
                <UsersListItemOptions user={user} />
            }
        </StyledListItem>
    )
}