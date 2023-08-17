import Add from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import { useState } from "react";
import AddUserModal from "./AddUserModal";


export default function AddUserButton() {
    const [addUserModalState, setAddUserModalState] = useState(false);

    function closeAddUserModal() {
        setAddUserModalState(false)
    }

    function openAddUserModal() {
        setAddUserModalState(true)
    }

    return (
        <>
            <AddUserModal open={addUserModalState} handleClose={closeAddUserModal} />
            <Button variant="contained" onClick={openAddUserModal}>
                <Add />
            </Button>
        </>
    )
}