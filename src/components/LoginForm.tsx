/* eslint-disable @next/next/no-img-element */
import { UserContext } from "@/contexts/userContext";
import styled from "@emotion/styled";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useContext, useState } from "react";

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
  const { authenticate, changeUserData } = useContext(UserContext);
  const [isLoading, setLoading] = useState(false);
  const { push } = useRouter();

  async function tryLogin() {
    const email = (document.querySelector("input[type='email']") as HTMLInputElement)
      .value;
    const senha = (document.querySelector("input[type='password']") as HTMLInputElement)
      .value;

    setLoading(true);

    const authResult = await authenticate(email, senha);

    if (authResult === null) {
      setLoading(false);
      return window.alert("Usuário não encontrado");
    }

    push("/projetos");
    changeUserData(authResult);
    return setLoading(false);
  }

  return (
    <StyledForm>
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
                label="E-mail"
                variant="standard"
                type={"email"}
              />
              <TextField
                label="Senha"
                variant="standard"
                type={"password"}
              />
            </div>
          </>
        )}
      </fieldset>

      <Button
        variant="contained"
        onClick={tryLogin}
        disabled={isLoading ? true : false}
      >
        Entrar
      </Button>
    </StyledForm>
  );
}
