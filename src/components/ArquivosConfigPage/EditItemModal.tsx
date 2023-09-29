import { useUpdateDiscipline, useUpdateEtapaDoProjeto, useUpdateTipoDeDocumento } from "@/hooks/filesConfigs"
import { Modal, Paper, TextField, Button, Grid, Typography } from "@mui/material"
import { useState } from "react"

export default function EditItemModal({ open, close, item, listType }) {
    const [nome, setNome] = useState(item.nome)
    const [sigla, setSigla] = useState(item.sigla)

    const { mutate: updateDiscipline } = useUpdateDiscipline()
    const { mutate: updateEtapa } = useUpdateEtapaDoProjeto()
    const { mutate: updateTipo } = useUpdateTipoDeDocumento()

    function handleCancel() {
        setNome(item.nome)
        setSigla(item.sigla)
        close()
    }

    function hanldeSubmit() {
        switch (listType) {
            case "Disciplinas":
                updateDiscipline({nome, sigla, id: item._id})
                break;
            case "Tipos de documento":
                updateTipo({nome, sigla, id: item._id})
                break;
            case "Etapas de projeto":
                updateEtapa({nome, sigla, id: item._id})
                break;
            default:
                break;
        }
        setNome(item.nome)
        setSigla(item.sigla)
        close()
    }

    return (
        <Modal open={open} onClose={handleCancel} sx={{ display: "grid", placeItems: "center" }}>
            <Paper elevation={8} sx={{ width: "30%", p: 2 }}>
                <Typography variant="h6" textAlign="center" mb={2}>Editar {item.sigla} - {item.nome}</Typography>

                <Grid container rowGap={1} columnGap={1}>
                    <Grid item xs={12}>
                        <TextField label="Nome" fullWidth defaultValue={item.nome} onChange={(ev) => setNome(ev.target.value)} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label="Sigla" fullWidth defaultValue={item.sigla} onChange={(ev) => setSigla(ev.target.value)} />
                    </Grid>
                    <Grid item xs={12} display="flex" justifyContent="space-between">
                        <Button color="error" variant="contained" onClick={handleCancel}>
                            Cancelar
                        </Button>
                        <Button variant="contained" onClick={hanldeSubmit} disabled={nome === item.nome && sigla === item.sigla}>
                            Enviar
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Modal>
    )
}