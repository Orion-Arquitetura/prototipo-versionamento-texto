import { useCreateDiscipline, useCreateEtapaDoProjeto, useCreateTipoDeDocumento } from "@/hooks/filesConfigs"
import { Modal, Paper, TextField, Button, Grid, Typography } from "@mui/material"
import { useState } from "react"

export default function AddItemModal({ open, close, listType }) {
    const [nome, setNome] = useState("")
    const [sigla, setSigla] = useState("")

    const { mutate: createDiscipline } = useCreateDiscipline()
    const { mutate: createTipoDeDocumento } = useCreateTipoDeDocumento()
    const { mutate: createEtapa } = useCreateEtapaDoProjeto()

    function handleCancel() {
        setNome("")
        setSigla("")
        close()
    }

    function hanldeSubmit() {
        switch (listType) {
            case "Disciplinas":
                createDiscipline({ nome, sigla })
                break;
            case "Tipos de documento":
                createTipoDeDocumento({ nome, sigla })
                break;
            case "Etapas de projeto":
                createEtapa({ nome, sigla })
                break;
            default:
                break;
        }
        setNome("")
        setSigla("")
        close()
    }

    return (
        <Modal open={open} onClose={handleCancel} sx={{ display: "grid", placeItems: "center" }}>
            <Paper elevation={8} sx={{ width: "30%", p: 2 }}>
                <Typography variant="h6" textAlign="center" mb={2}>Adicionar {listType.toLowerCase()}</Typography>
                <Grid container rowGap={1} columnGap={1}>
                    <Grid item xs={12}>
                        <TextField label="Nome" fullWidth required onChange={ev => setNome(ev.target.value)} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label="Sigla" fullWidth required onChange={ev => setSigla(ev.target.value)} />
                    </Grid>
                    <Grid item xs={12} display="flex" justifyContent="space-between">
                        <Button color="error" variant="contained" onClick={handleCancel}>
                            Cancelar
                        </Button>
                        <Button variant="contained" onClick={hanldeSubmit} disabled={nome === "" || sigla === ""} >
                            Enviar
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Modal>
    )
}