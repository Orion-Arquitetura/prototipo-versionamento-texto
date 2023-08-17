import { useGetUsers } from "@/hooks/user";
import { Button, List, ListItem, Paper, Typography } from "@mui/material";
import { User } from "@/utils/types";
import UsersListItem from "./UsersListItem";


export default function UsersList() {
    const { data: users, isLoading } = useGetUsers();

    return (
        <List component={({ children }) => <Paper elevation={8}>{children}</Paper>}>
            {!isLoading && users.map((user: User) => {
                return (
                    <UsersListItem key={user._id} user={user} />
                )
            })}
        </List>
    )
}