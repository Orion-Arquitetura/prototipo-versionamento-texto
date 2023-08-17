import { Box, Grid, Paper } from "@mui/material";
import { theme } from "@/theme/theme";
import { ReactNode } from "react";
import GroupIcon from "@mui/icons-material/Group";
import FolderIcon from "@mui/icons-material/Folder";
import Router from "next/router";
import Link from "next/link";

function CustomComponent({ children }: { children: ReactNode }) {
    return (
        <Paper
            elevation={8}
            sx={{
                flexBasis: "30%",
                minHeight: "100px",
                backgroundColor: theme.palette.primary.main,
                color: "#ffffffdc",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                cursor: "pointer",
                "&:hover": {
                    backgroundColor: "#8EA3A8",
                    backgroundImage: "url('/orion-estrela.svg')",
                    backgroundSize: "155px",
                    backgroundRepeat: "no-repeat",
                    backgroundPositionX: "120%",
                    backgroundPositionY: "50%",
                    color: "#1d424d",
                },
                "& a": {
                    height: "100%",
                    p: 1.5,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                }
            }}
        >
            {children}
        </Paper>
    );
}

export default function ProjectListItem({ title, users, arquivos, id }: { title: string, users: number, arquivos: number, id: string }) {
    return (
        <Grid item component={CustomComponent}>
            <Link href={
                { pathname: "/auth/projetos/projeto", query: { id: id } }
            }>
                <p>{title}</p>
                <Box sx={{ display: "flex", columnGap: 2 }}>
                    <Box sx={{ display: "flex", alignItems: "center", fontSize: "0.8rem", columnGap: 1 }}>
                        <GroupIcon fontSize="small" />
                        {users}
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", fontSize: "0.8rem", columnGap: 1 }}>
                        <FolderIcon fontSize="small" />
                        {arquivos}
                    </Box>
                </Box>
            </Link>
        </Grid>
    );
}
