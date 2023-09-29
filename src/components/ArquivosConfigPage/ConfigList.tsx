import { ExpandLess, ExpandMore, Add } from "@mui/icons-material"
import { Paper, List, ListItemButton, Typography, Button, Collapse } from "@mui/material"
import ConfigListItem from "./ConfigListItem";
import { useGetDisciplines } from "@/hooks/filesConfigs";
import { useGetEtapasDoProjeto } from "@/hooks/filesConfigs";
import { useGetTiposDeDocumento } from "@/hooks/filesConfigs";
import { useState } from "react";
import AddItemModal from "./AddItemModal";


export default function ConfigList({ listType }) {
    const { data: tipoDeDocumento, isLoading: isLoadingTipoDeDocumento } = useGetTiposDeDocumento();
    const { data: etapas, isLoading: isLoadingEtapas } = useGetEtapasDoProjeto();
    const { data: disciplinas, isLoading: isLoadingDisciplinas } = useGetDisciplines();
    const [listState, setListState] = useState(true);
    const [addItemModalState, setAddItemModalState] = useState(false);

    function openAddItemModal() {
        setAddItemModalState(true)
    }

    function closeAddItemModal() {
        setAddItemModalState(false)
    }

    if (listType === "Disciplinas") {
        return (
            <Paper component={List} elevation={8} sx={{ p: 0 }}>
                <AddItemModal close={closeAddItemModal} open={addItemModalState} listType={listType} />
                <ListItemButton onClick={() => setListState((prev) => !prev)} sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography variant="h6">Disciplinas</Typography>
                    {listState ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Button fullWidth onClick={openAddItemModal}>
                    Adicionar <Add fontSize="small" />
                </Button>
                <Collapse in={listState}>
                    {!isLoadingDisciplinas && disciplinas.map((disciplina) => {
                        return (
                            <ConfigListItem listType={listType} item={disciplina} key={disciplina.sigla} />
                        )
                    })}
                </Collapse>
            </Paper>
        )
    }

    if (listType === "Tipos de documento") {
        return (
            <Paper component={List} elevation={8} sx={{ p: 0 }}>
                <AddItemModal close={closeAddItemModal} open={addItemModalState} listType={listType} />
                <ListItemButton onClick={() => setListState((prev) => !prev)} sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography variant="h6">Tipos de documento</Typography>
                    {listState ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Button fullWidth onClick={openAddItemModal}>
                    Adicionar <Add fontSize="small" />
                </Button>
                <Collapse in={listState}>
                    {!isLoadingTipoDeDocumento && tipoDeDocumento.map((tipoDeDocumento) => {
                        return (
                            <ConfigListItem listType={listType} item={tipoDeDocumento} key={tipoDeDocumento.sigla} />
                        )
                    })}
                </Collapse>
            </Paper>
        )
    }

    if (listType === "Etapas de projeto") {
        return (
            <Paper component={List} elevation={8} sx={{ p: 0 }}>
                <AddItemModal close={closeAddItemModal} open={addItemModalState} listType={listType} />
                <ListItemButton onClick={() => setListState((prev) => !prev)} sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography variant="h6">Etapas de projeto</Typography>
                    {listState ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Button fullWidth onClick={openAddItemModal}>
                    Adicionar <Add fontSize="small" />
                </Button>
                <Collapse in={listState}>
                    {!isLoadingEtapas && etapas.map((etapa) => {
                        return (
                            <ConfigListItem listType={listType} item={etapa} key={etapa.sigla} />
                        )
                    })}
                </Collapse>
            </Paper>
        )
    }

}