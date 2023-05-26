import { Button } from "@mui/material";
import FilterAltIcon from '@mui/icons-material/FilterAlt';

//considerar renomear para "OpenFilters"

export default function FilterListButton({handleOpen}: {handleOpen: () => void}) {
    return (
        <Button variant="contained" onClick={handleOpen}>
            <FilterAltIcon />
        </Button>
    )
}