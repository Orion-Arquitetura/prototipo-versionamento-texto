import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useContext, useState } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { UserCRUDContext } from "@/contexts/UserCrudContext";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  row-gap: 15px;
  height: 100%;
`;

const StyledBox = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #f5f5f5;
  height: 350px;
  box-shadow: 0px 0px 24px rgba(0, 0, 0, 0.5);
  padding: 16px;
  min-width: 50%;
  height: fit-content;
`;
export default function AddUserModal({ isOpen, handleClose }: any) {
  const { register, handleSubmit } = useForm();

  const { createUser } = useContext(UserCRUDContext);

  async function submit(data: any) {
    const isUserCreated = await createUser(data);

    if (isUserCreated) {
      handleClose();
    }
  }

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
    >
      <StyledBox>
        <StyledForm onSubmit={handleSubmit(submit)}>
          <TextField
            label="Nome"
            variant="outlined"
            type="text"
            required
            {...register("nome")}
          />
          <TextField
            label="Email"
            variant="outlined"
            type="email"
            required
            {...register("email")}
          />
          <FormControl fullWidth>
            <InputLabel>Tipo de usuário</InputLabel>
            <Select
              required
              defaultValue={"funcionario"}
              label="Tipo de usuário"
              {...register("tipo")}
            >
              <MenuItem value={"funcionario"}>Funcionário</MenuItem>
              <MenuItem value={"cliente"}>Cliente</MenuItem>
              <MenuItem value={"administrador"}>Administrador</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="contained"
            type="submit"
          >
            Enviar
          </Button>
        </StyledForm>
      </StyledBox>
    </Modal>
  );
}
