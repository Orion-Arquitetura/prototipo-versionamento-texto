import styled from "@emotion/styled";
import { useForm } from "react-hook-form";

const Styled = styled.div``;

export default function Cadastro() {
  const { register, handleSubmit } = useForm();

  async function cadastrar({ nome, email, funcao }: any) {
    if (funcao === "funcionario") {
      await fetch("/api/usuario/funcionario/criarFuncionario", {
        method: "POST",
        body: JSON.stringify({ nome, email, funcao }),
      }).then((res) => console.log(res.body));

      return;
    }

    await fetch("/api/usuario/cliente/criarCliente", {
      method: "POST",
      body: JSON.stringify({ nome, email, funcao }),
    }).then((res) => console.log(res.body));

    return;
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
          Função
          <select {...register("funcao")}>
            <option value="funcionario">Funcionário</option>
            <option value="cliente">Cliente</option>
          </select>
        </label>
        <button>Enviar</button>
      </form>
    </Styled>
  );
}
