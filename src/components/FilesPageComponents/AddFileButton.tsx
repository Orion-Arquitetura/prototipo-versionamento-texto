import Button from "@mui/material/Button";
import Add from "@mui/icons-material/Add";

export default function AddFileButton({ handleOpen }: { handleOpen: () => void }) {
  return (
    <Button
      onClick={handleOpen}
      variant="contained"
      sx={{backgroundColor: "var(--gray5)", ":hover": {backgroundColor: "var(--gray1)"}}}
      title="Adicionar arquivo"
    >
      <Add />
    </Button>
  );
}
