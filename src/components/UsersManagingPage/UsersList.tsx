import { useGetUsers } from "@/hooks/user";
import { Checkbox, FormControlLabel, FormGroup, Grid, List, Paper } from "@mui/material";
import UsersListItem from "./UsersListItem";
import { useState } from "react";
import { User } from "@/utils/types";

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
    const [filters, setFilters] = useState({
        administrador: true,
        funcionario: true,
        cliente: true
    })

    function toggleFilter(value: "administrador" | "funcionario" | "cliente") {
        setFilters(prevState => ({
            ...prevState,
            [value]: !prevState[value]
        }))
    }

    return (
        <Grid container columnGap={1}>
            <Grid item xs={2}>
                <Paper sx={{ p: 2 }} elevation={8}>
                    <FormGroup onChange={(ev) => toggleFilter((ev.target as HTMLInputElement).value as "administrador" | "funcionario" | "cliente")}>
                        <FormControlLabel control={<Checkbox defaultChecked value={"administrador"} />} label="Administradores" />
                        <FormControlLabel control={<Checkbox defaultChecked value={"funcionario"} />} label="Funcionários" />
                        <FormControlLabel control={<Checkbox defaultChecked value={"cliente"} />} label="Clientes" />
                    </FormGroup>
                </Paper>
            </Grid>
            <Grid item xs={true}>
                <List sx={ListStyles}>
                    {!isLoading && users.map((user: User) => {
                        if (filters[user.tipo]) {
                            return (
                                <UsersListItem key={user._id} user={user} />
                            )
                        }

                        return null
                    })}
                </List >
            </Grid>
        </Grid>
    )
}