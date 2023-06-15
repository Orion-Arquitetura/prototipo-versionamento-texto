/* eslint-disable @next/next/no-img-element */
import { AuthContext } from "@/contexts/AuthContext";
import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Router from "next/router";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import PuffLoader from "react-spinners/PuffLoader";

const StyledForm = styled.form`
  width: clamp(200px, 40vw, 500px);
  background-color: white;
  padding: 40px 40px 60px 40px;
  display: flex;
  flex-direction: column;
  border-radius: 3px;
  box-shadow: 0px 0px 125px rgba(0, 0, 0, 0.1);

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
      row-gap: 20px;
      flex-direction: column;

      & > label {
        display: flex;
        flex-direction: column;

        & input {
          padding: 12px 10px;
          background-color: white;
          border: solid 1px black;
          border-radius: 4px;
        }
      }
    }
  }

  & button {
    width: 50%;
    align-self: center;
    padding-top: 10px;
    padding-bottom: 10px;
    background-color: var(--midnight-green);

    &:hover {
      background-color: var(--gray5);
    }
  }

  & .loading-div {
    padding: 40px 40px 60px 40px;
    text-align: center;
  }
`;

export default function LoginForm() {
  const { signIn, isLoadingUserData } = useContext(AuthContext);
  const { register, handleSubmit } = useForm();

  async function handleSignIn({ email, senha }: any) {
    await signIn({ email, senha }).then((res) => {
      if (res) {
        console.log("ok");
        Router.push("/projetos");
      } else {
        window.alert("Erro");
      }
    });
  }

  if (isLoadingUserData) {
    return (
      <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", rowGap: 10, height: "100vh" }}>
        <img
          src="./orion-arq-marca-final.png"
          alt="Orion logo"
          width="200"
          
        ></img>
        <Box >
          <PuffLoader color="#36d7b7" />
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ display: "grid", placeItems: "center", height: "100vh" }}>
      <StyledForm onSubmit={handleSubmit(handleSignIn)}>
        <fieldset>
          <legend>
            <img
              src="./orion-arq-marca-final.png"
              alt="Orion logo"
            ></img>
          </legend>
          <div className="padding-div">
            <label>
              E-mail:
              <input
                {...register("email")}
                type={"email"}
                name="email"
                required
                disabled={isLoadingUserData ? true : false}
              />
            </label>
            <label>
              Senha:
              <input
                {...register("senha")}
                type={"password"}
                name="senha"
                required
                disabled={isLoadingUserData ? true : false}
              />
            </label>
          </div>
        </fieldset>

        {isLoadingUserData ? null : (
          <Button
            variant="contained"
            type="submit"
          >
            Entrar
          </Button>
        )}
      </StyledForm>
    </Box>
  );
}
