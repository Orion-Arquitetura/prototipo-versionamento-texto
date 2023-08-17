import { User } from "@/utils/types";
import styled from "@emotion/styled";
import { ListItem, Typography } from "@mui/material";
import UsersListItemOptions from "./UsersListItemOptions";


const StyledListItem = styled(ListItem)`
    display: flex;
    justify-content: space-between;
    padding: 16px;
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