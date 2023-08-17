import UsersList from "@/components/UsersManagingPage/UsersList";
import UsersManagingToolbar from "@/components/UsersManagingPage/UsersManagingToolbar";
import { Container } from "@mui/material";


export default function Usuarios() {
    return (
        <Container>
            <UsersManagingToolbar />
            <UsersList />
        </Container>
    )
}