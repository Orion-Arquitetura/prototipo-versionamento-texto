
import PageTitle from "@/components/PageTitle";
import { Container, Grid, Paper, Typography, ListItemButton } from "@mui/material";
import { useState } from "react";
import { theme } from "@/theme/theme";
import ConfigList from "@/components/ArquivosConfigPage/ConfigList";

export default function Arquivos() {
    const [listType, setListType] = useState<"Disciplinas" | "Tipos de documento" | "Etapas de projeto">("Disciplinas")

    return (
        <Container sx={{ pb: 10 }}>
            <PageTitle title="Configurações de arquivos" hasBackButton />
            <Paper elevation={8} sx={{ p: 2, minHeight: "50vh", backgroundColor: theme.palette.primary.main }}>
                <Grid container columnGap={1}>
                    <Grid item xs={3}>
                        <Paper elevation={8}>
                            <ListItemButton onClick={() => setListType("Disciplinas")}>
                                <Typography>Disciplinas</Typography>
                            </ListItemButton>
                            <ListItemButton onClick={() => setListType("Tipos de documento")}>
                                <Typography>Tipos de documento</Typography>
                            </ListItemButton>
                            <ListItemButton onClick={() => setListType("Etapas de projeto")}>
                                <Typography>Etapas de projeto</Typography>
                            </ListItemButton>
                        </Paper>
                    </Grid>
                    <Grid item xs={true}>
                        <ConfigList listType={listType} />
                    </Grid>
                </Grid>
            </Paper>
        </Container >
    )
}