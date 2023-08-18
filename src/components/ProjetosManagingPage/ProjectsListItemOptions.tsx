import { Button, Menu, MenuItem } from "@mui/material";
import Link from "next/link";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useState } from "react";
import { Projeto } from "@/utils/types";
import DeleteProjectModal from "./DeleteProjectModal";
import { theme } from "@/theme/theme";
import Router from "next/router";


export default function ProjectsListItemOptions({ projeto }: { projeto: Projeto }) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [deleteProjectModalState, setDeleteProjectModalState] = useState(false);
    const open = Boolean(anchorEl);

    function handleClickMenu(event: any) {
        setAnchorEl(event.currentTarget);
    }

    function handleCloseMenu() {
        setAnchorEl(null);
    }

    function openDeleteProjectModal() {
        handleCloseMenu()
        setDeleteProjectModalState(true)
    }

    function closeDeleteProjectModal() {
        setDeleteProjectModalState(false)
    }

    return (
        <>
            <DeleteProjectModal open={deleteProjectModalState} handleClose={closeDeleteProjectModal} project={projeto} />
            
            <Button
                onClick={handleClickMenu}
                sx={{ padding: 0 }}
            >
                <MoreHorizIcon sx={{color: "white"}} />
            </Button>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleCloseMenu}
                anchorOrigin={{ vertical: "center", horizontal: "center" }}
            >
                <MenuItem onClick={() => Router.push(`/auth/admin/projetos/projeto?id=${projeto._id}`)}>Configurações</MenuItem>
                <MenuItem onClick={openDeleteProjectModal}>Excluir</MenuItem>
            </Menu>
        </>
    )
}