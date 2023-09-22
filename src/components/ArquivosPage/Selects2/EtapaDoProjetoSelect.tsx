import { useGetEtapasDoProjeto } from "@/hooks/etapasDoProjeto";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export default function EtapaDoProjetoSelect({
  setEtapaDoProjeto,
  selectedTipoDeArquivo,
}: {
  setEtapaDoProjeto: (etapa:string) => void;
  selectedTipoDeArquivo: string;
}) {
  const { data: etapasDoProjeto, isLoading } = useGetEtapasDoProjeto();

  return (
    <FormControl fullWidth>
      <InputLabel>Etapa do projeto</InputLabel>
      <Select
        value={selectedTipoDeArquivo}
        label="Etapa do projeto"
        onChange={(ev) => setEtapaDoProjeto(ev.target.value)}
      >
        {!isLoading &&
          etapasDoProjeto.map(
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
