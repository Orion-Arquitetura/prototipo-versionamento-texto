import styled from "@emotion/styled";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";

const Styled = styled.div``;

export default function Cadastro() {
  const { register, handleSubmit } = useForm();
  const { data, isLoading } = useQuery({
    queryKey: ["funcionarios"],
    queryFn: getFuncionarios,
  });

  async function getFuncionarios() {
    const data = await fetch("/api/usuario/funcionario/listarFuncionarios").then(
      (res: any) => res.json()
    );
    return data;
  }

  async function cadastrarProjeto({ nome, email, funcao }: any) {
    if (funcao === "funcionario") {
      await fetch("/api/projetos/criarProjeto", {
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
      <form onSubmit={handleSubmit(cadastrarProjeto)}>
        <label>
          Nome do projeto
          <input
            type="nome"
            {...register("nome")}
          ></input>
        </label>
        <fieldset>
          <legend>Funcionários</legend>
          {isLoading ? 
            <div>Loading...</div>
           : 
           data.map((element:any) => {
            return (
                <label key={element.nome}>
                    <input type="checkbox" value={element.nome} />
                    {element.nome}
                </label>
            )
           })
          }
        </fieldset>
        <button>Enviar</button>
      </form>
    </Styled>
  );
}
