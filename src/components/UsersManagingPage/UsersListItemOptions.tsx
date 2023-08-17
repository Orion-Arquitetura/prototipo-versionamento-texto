import { useDeleteUser } from "@/hooks/user";
import projetos from "@/pages/auth/projetos";
import { Button, Menu, MenuItem, Typography } from "@mui/material";
import Link from "next/link";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useState } from "react";
import { User } from "@/utils/types";
import AddUserToProjectsModal from "./AddUserToProjectsModal";
import RemoveUserFromProjectsModal from "./RemoveUserFromProjectsModal";

export default function UsersListItemOptions({ user }: { user: User }) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const [addUserToProjectsModalState, setAddUserToProjectsModalState] = useState(false);
    const [removeUserFromProjectsModalState, setRemoveUserFromProjectsModalState] =
        useState(false);

    const { mutate } = useDeleteUser()

    function openAddUserToProjectsModal() {
        setAddUserToProjectsModalState(true);
        handleCloseMenu();
    }

    function closeAddUserToProjectsModal() {
        setAddUserToProjectsModalState(false);
    }

    function openRemoveUserFromProjectsModal() {
        setRemoveUserFromProjectsModalState(true);
        handleCloseMenu();
    }

    function closeRemoveUserFromProjectsModal() {
        setRemoveUserFromProjectsModalState(false);
    }

    function handleClickMenu(event: any) {
        setAnchorEl(event.currentTarget);
    }

    function handleCloseMenu() {
        setAnchorEl(null);
    }

    function handleDeleteUser() {
        mutate(user);
        handleCloseMenu();
    }

    return (
        <>
            <AddUserToProjectsModal
                isOpen={addUserToProjectsModalState}
                handleClose={closeAddUserToProjectsModal}
                user={user}
            />
            <RemoveUserFromProjectsModal
                isOpen={removeUserFromProjectsModalState}
                handleClose={closeRemoveUserFromProjectsModal}
                user={user}
            />
            <Button
                onClick={handleClickMenu}
                sx={{ padding: 0 }}
            >
                <MoreHorizIcon />
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleCloseMenu}
                anchorOrigin={{ vertical: "center", horizontal: "center" }}
            >
                <MenuItem onClick={openAddUserToProjectsModal}>Adicionar a projetos</MenuItem>
                <MenuItem onClick={openRemoveUserFromProjectsModal}>Remover de projetos</MenuItem>
                <MenuItem LinkComponent={Link} href={`/users/${user._id}`}>Detalhes</MenuItem>
                <MenuItem onClick={handleDeleteUser}>Excluir</MenuItem>
            </Menu>
        </>
    );
}