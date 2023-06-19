import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent  } from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";

type SelectInputType = {
  list: {sigla: string, nome: string}[];
  filterName: string,
  setFileFilters: (arg: string) => void
};

export default function SelectInput({ list, filterName, setFileFilters }: SelectInputType) {
  const [state, setState] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setState(event.target.value as string);
    setFileFilters(event.target.value as string)
  };

  return (
    <FormControl sx={{width: "100%"}}>
      <InputLabel>{filterName}</InputLabel>
      <Select
        value={state}
        label={filterName}
        onChange={handleChange}
      >
        {list.map((item:{sigla: string, nome: string}) => {
            return <MenuItem value={item.sigla} key={item.sigla} title={item.nome}>{item.sigla}</MenuItem>
        })}
        
      </Select>
    </FormControl>
  );
}
