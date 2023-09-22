import UsersList from "@/components/UsersManagingPage/UsersList";
import UsersManagingToolbar from "@/components/UsersManagingPage/UsersManagingToolbar";
import { Container } from "@mui/material";
import { GetServerSidePropsContext } from "next";
import { parseCookies } from "nookies";


export default function Usuarios() {
    return (
        <Container sx={{pb: 10}}>
            <UsersManagingToolbar />
            <UsersList />
        </Container>
    )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const cookies = parseCookies(context);

    if ((cookies.client_tipo !== "administrador") || (cookies.client_tipo === undefined)) {
        return {
            redirect: {
                destination: "/",
                permanent: false
            }
        }
    }

    return {
        props: {}
    }
}