import { useGetUsers } from "@/hooks/user";
import { Button, List, ListItem, Paper, Typography } from "@mui/material";
import { User } from "@/utils/types";
import UsersListItem from "./UsersListItem";

const ListStyles = {
    borderRadius: "8px",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    rowGap: "8px",
    backgroundColor: "rgba(0,0,0,0)"
}


export default function UsersList() {
    const { data: users, isLoading } = useGetUsers();

    return (
        <List sx={ListStyles}>
            {!isLoading && users.map((user: User) => {
                return (
                    <UsersListItem key={user._id} user={user} />
                )
            })}
        </List >
    )
}