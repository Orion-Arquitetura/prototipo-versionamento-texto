import { UserCRUDContext } from "@/contexts/UserCrudContext";
import styled from "@emotion/styled";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";

const StyledDiv = styled.div`
  height: 100vh;
  padding-top: 100px;
  border: solid 1px red;
`;

export default function CreateUser() {
  const { register, handleSubmit } = useForm();
  const { createUser } = useContext(UserCRUDContext);
  const [role, setRole] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setRole(event.target.value as string);
  };

  async function submit({ nome, email }: any) {
    await createUser({ nome, email });
  }

  return (
    <StyledDiv>
      <form onSubmit={handleSubmit(submit)}>
        <input
          required
          placeholder="Nome"
          type="text"
          {...register("nome")}
        />
        <input
          required
          placeholder="Email"
          type="email"
          {...register("email")}
        />
        <InputLabel id="demo-simple-select-label">Tipo</InputLabel>
        <Select
          {...register("tipo")}
          value={role}
          label="Tipo"
          onChange={handleChange}
        >
          <MenuItem value={"funcionario"}>Funcionário</MenuItem>
          <MenuItem value={"cliente"}>Cliente</MenuItem>
          <MenuItem value={"admin"}>Admin</MenuItem>
        </Select>
        <button>Enviar</button>
      </form>
    </StyledDiv>
  );
}