/* eslint-disable @next/next/no-img-element */
import { AuthContext } from "@/contexts/AuthContext";
import styled from "@emotion/styled";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";

const StyledForm = styled.form`
  width: clamp(200px, 40vw, 500px);
  background-color: white;
  padding: 40px 40px 60px 40px;
  display: flex;
  flex-direction: column;
  border-radius: 3px;

  & fieldset:not(input) {
    display: flex;
    flex-direction: column;
    border: 0;

    & legend {
      display: flex;
      justify-content: center;
      & img {
        width: 50%;
      }
    }

    .padding-div {
      padding-top: 40px;
      padding-bottom: 80px;
      display: flex;
      row-gap: 40px;
      flex-direction: column;
    }
  }

  & button {
    width: 50%;
    align-self: center;
    padding-top: 10px;
    padding-bottom: 10px;
  }

  & .loading-div {
    padding: 40px 40px 60px 40px;
    text-align: center;
  }
`;

export default function LoginForm() {
  const { signIn } = useContext(AuthContext);
  const [isLoading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm();
  const { push } = useRouter();

  async function handleSignIn({ email, senha }: any) {
    console.log(email, senha);
  }

  return (
    <StyledForm onSubmit={handleSubmit(handleSignIn)}>
      <fieldset>
        <legend>
          <img
            src="./orion-logo.png"
            alt="Orion logo"
          ></img>
        </legend>
        {isLoading ? (
          <div className="loading-div">Carregando...</div>
        ) : (
          <>
            <div className="padding-div">
              <TextField
                {...register("email")}
                label="E-mail"
                variant="standard"
                type={"email"}
                name="email"
                required
              />
              <TextField
                {...register("senha")}
                label="Senha"
                variant="standard"
                type={"password"}
                name="senha"
                required
              />
            </div>
          </>
        )}
      </fieldset>

      <Button
        variant="contained"
        type="submit"
        disabled={isLoading ? true : false}
      >
        Entrar
      </Button>
    </StyledForm>
  );
}
