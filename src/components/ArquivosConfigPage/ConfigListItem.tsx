import StyledListItem from "@/styles/StyledListItem";
import { Box, IconButton, Tooltip } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from "react";
import EditItemModal from "./EditItemModal";
import DeleteItemModal from "./DeleteItemModal";

export default function ConfigListItem({ item, listType }) {
    const [deleteModalState, setDeleteModalState] = useState(false)
    const [editModalState, setEditModalState] = useState(false);

    function openEditModal() {
        setEditModalState(true);
    }

    function closeEditModal() {
        setEditModalState(false);
    }

    function openDeleteModal() {
        setDeleteModalState(true)
    }

    function closeDeleteModal() {
        setDeleteModalState(false)
    }

    return (
        <StyledListItem key={item.sigla}>
            <EditItemModal listType={listType} close={closeEditModal} item={item} open={editModalState} />
            <DeleteItemModal listType={listType} close={closeDeleteModal} item={item} open={deleteModalState} />
            <Box>
                {item.sigla} - {item.nome}
            </Box>
            <Box display="flex" columnGap={1}>
                <Tooltip title="Editar">
                    <IconButton onClick={openEditModal}>
                        <EditIcon className="item-icon" fontSize="small" />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Excluir">
                    <IconButton onClick={openDeleteModal}>
                        <DeleteIcon className="item-icon" fontSize="small" />
                    </IconButton>
                </Tooltip>
            </Box>
        </StyledListItem>
    )
}