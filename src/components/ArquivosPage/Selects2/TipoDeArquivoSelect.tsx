import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export default function TipoDeArquivoSelect({
  setTipoDeArquivo,
  selectedTipoDeArquivo,
}: {
  setTipoDeArquivo: (disciplina: string) => void;
  selectedTipoDeArquivo: string;
}) {

  return (
    <FormControl fullWidth>
      <InputLabel>Tipo de Arquivo</InputLabel>
      <Select
        value={selectedTipoDeArquivo}
        label="Tipo de arquivo"
        onChange={(ev) => setTipoDeArquivo(ev.target.value)}
      >
        <MenuItem title={"Documentação"} value={"documentacao"}>
          {"Documentação"}
        </MenuItem>
        <MenuItem title={"Projeto"} value={"projeto"}>
          {"Projeto"}
        </MenuItem>

      </Select>
    </FormControl>
  );
}
