import { Button, Tooltip } from "@mui/material";
import GerenciarProjetistasModal from "./GerenciarProjetistasModal";
import { useState } from "react";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

export default function GerenciarProjetistasButton({ project }: any) {
    const [modalState, setModalState] = useState(false)

    function openModal() {
        setModalState(true)
    }

    function closeModal() {
        setModalState(false)
    }

    return (
        <>
            <GerenciarProjetistasModal isOpen={modalState} close={closeModal} project={project} />
            <Tooltip title="Gerenciar projetistas" placement="top">
                <Button onClick={openModal} variant="contained"
                    title="Gerenciar projetistas">
                    <PeopleAltIcon />
                </Button>
            </Tooltip>
        </>
    )
}