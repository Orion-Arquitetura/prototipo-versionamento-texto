/* eslint-disable @next/next/no-img-element */
import styled from "@emotion/styled";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useRouter } from "next/router";

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
`;

export default function LoginForm() {
  const { push } = useRouter();
  function goToInitialPage() {
    push("/projetos");
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
      </fieldset>

      <Button variant="contained" onClick={goToInitialPage}>Entrar</Button>
    </StyledForm>
  );
}
