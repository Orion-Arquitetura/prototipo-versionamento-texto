import Button from "@mui/material/Button";
import Add from "@mui/icons-material/Add";

export default function AddFileButton({ handleOpen }: { handleOpen: () => void }) {
  return (
    <Button
      onClick={handleOpen}
      variant="contained"
    >
      <Add />
    </Button>
  );
}
