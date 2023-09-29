import { useGetTiposDeDocumento } from "@/hooks/filesConfigs";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export default function TipoDeDocumentoSelect({
  setTipoDeDocumento,
  selectedTipoDeDocumento,
}: {
  setTipoDeDocumento: (disciplina: string) => void;
  selectedTipoDeDocumento: string;
}) {
  const { data: tiposDeDocumento, isLoading } = useGetTiposDeDocumento();

  return (
    <FormControl fullWidth>
      <InputLabel>Tipo de documento</InputLabel>
      <Select
        value={selectedTipoDeDocumento}
        label="Tipo de documento"
        onChange={(ev) => setTipoDeDocumento(ev.target.value)}
      >
        {!isLoading &&
          tiposDeDocumento.map(
            ({ nome, sigla }: { nome: string; sigla: string }) => (
              <MenuItem key={sigla} title={nome} value={sigla}>
                {sigla}
              </MenuItem>
            )
          )}
      </Select>
    </FormControl>
  );
}
