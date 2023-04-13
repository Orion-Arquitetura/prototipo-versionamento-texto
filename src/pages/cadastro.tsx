import styled from "@emotion/styled";
import { useForm } from "react-hook-form";

const Styled = styled.div``;

export default function Cadastro() {
  const { register, handleSubmit } = useForm();

  async function cadastrar({ nome, email, senha }: any) {
    const data = await fetch("/api/cadastro/novoUsuario", {
      method: "POST",
      body: JSON.stringify({ nome, email, senha }),
    }).then(res => console.log(res));
  }

  return (
    <Styled>
      <form onSubmit={handleSubmit(cadastrar)}>
      <label>
          Nome
          <input
            type="nome"
            {...register("nome")}
          ></input>
        </label>
        <label>
          Email
          <input
            type="email"
            {...register("email")}
          ></input>
        </label>
        <label>
          Senha
          <input
            type="password"
            {...register("senha")}
          ></input>
        </label>
        <button>Enviar</button>
      </form>
    </Styled>
  );
}
