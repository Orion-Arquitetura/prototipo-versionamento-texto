import projeto from "@/pages/auth/projetos/projeto";
import { Paper, Typography, Box } from "@mui/material";
import AddUsersToProjectButton from "./AddUsersToProjectButton";
import { User, Projeto } from "@/utils/types";

const PaperStyles = {
    p: 2,
    display: "flex",
    flexDirection: "column",
    rowGap: "0px",
};

type ProjectUsersType = {
    title: string,
    project: Projeto,
    usersType: string,
    usersList: User[],
    emptyListText: string,
    filledListText: string,
};

export default function ProjectUsers({
    title,
    project,
    usersType,
    usersList,
    emptyListText,
    filledListText,
}: ProjectUsersType) {
    if (title === "Adicionar um líder" && project.lider) {
        return (
            <Paper elevation={8} sx={PaperStyles}>
                <Typography>
                    {usersList.length === 0 ? emptyListText : filledListText}
                </Typography>
                <Box sx={{ mt: 1, mb: 1 }}>
                    {usersList.length > 0 &&
                        usersList.map((user: User) => <div key={user._id}>{user.nome}</div>)}
                </Box>
            </Paper>
        )
    }

    return (
        <Paper elevation={8} sx={PaperStyles}>
            <Typography>
                {usersList.length === 0 ? emptyListText : filledListText}
            </Typography>
            <Box sx={{ mt: 1, mb: 1 }}>
                {usersList.length > 0 &&
                    usersList.map((user: User) => <div key={user._id}>{user.nome}</div>)}
            </Box>

            <AddUsersToProjectButton
                title={title}
                project={project}
                tipo={usersType}
            />
        </Paper>
    );
}
