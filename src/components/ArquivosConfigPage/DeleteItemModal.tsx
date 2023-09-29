import { useDeleteDiscipline, useDeleteEtapaDoProjeto, useDeleteTipoDeDocumento } from "@/hooks/filesConfigs"
import { Modal, Paper, Button, Typography, Grid } from "@mui/material"

export default function DeleteItemModal({ open, close, item, listType }) {

    const { mutate: deleteDiscipline } = useDeleteDiscipline()
    const { mutate: deleteEtapa } = useDeleteEtapaDoProjeto()
    const { mutate: deleteTipo } = useDeleteTipoDeDocumento()

    function hanldeSubmit() {
        console.log("Oi")
        switch (listType) {
            case "Disciplinas":
                deleteDiscipline(item._id)
                break;
            case "Tipos de documento":
                deleteTipo(item._id)
                break;
            case "Etapas de projeto":
                deleteEtapa(item._id)
                break;
            default:
                break;
        }
        close()
    }

    return (
        <Modal open={open} onClose={close} sx={{ display: "grid", placeItems: "center" }}>
            <Paper elevation={8} sx={{ width: "30%", p: 2 }}>
                <Grid container rowGap={2}>
                    <Grid item xs={12}>
                        <Typography variant="h6" textAlign="center">Tem certeza que deseja excluir esta categoria?</Typography>
                        <Typography variant="h6" textAlign="center">{item.sigla} - {item.nome}</Typography>
                    </Grid>
                    <Grid item xs={12} display="flex" justifyContent="space-between">
                        <Button color="error" variant="contained" onClick={close}>
                            Cancelar
                        </Button>
                        <Button variant="contained" onClick={hanldeSubmit} >
                            Confirmar
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Modal>
    )
}