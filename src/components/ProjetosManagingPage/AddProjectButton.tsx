import Add from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import { useState } from "react";
import AddProjectModal from "./AddProjectModal";


export default function AddProjectButton() {
    const [addProjectModalState, setAddProjectModalState] = useState(false);

    function closeAddProjectModal() {
        setAddProjectModalState(false)
    }

    function openAddProjectModal() {
        setAddProjectModalState(true)
    }

    return (
        <>
            <AddProjectModal open={addProjectModalState} handleClose={closeAddProjectModal} />
            <Button variant="contained" onClick={openAddProjectModal}>
                <Add />
            </Button>
        </>
    )
}