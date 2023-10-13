export type User = {
  _id: string;
  nome: string;
  email: string;
  tipo: "funcionario" | "administrador" | "cliente";
  projetos: {
    projeto: Projeto;
    roles: Array<"projetista" | "lider" | "funcionario">;
  }[];
  tarefas: string[]
  createdAt: string;
  updatedAt: string
};

export type ClienteUser = {
  _id: string;
  nome: string;
  email: string;
  tipo: "cliente";
  projetos: {
    projeto: Projeto;
    roles: Array<"projetista" | "lider" | "funcionario">;
  }[];
  dataCriacao: string;
};

export type Projeto = {
  _id: string;
  nome: string;
  ano: string;
  numero: number;
  dataCriacao: string;
  usuarios: {
    lider: FuncionarioUser,
    projetistas: FuncionarioUser[],
    clientes: ClienteUser[],
    outros: FuncionarioUser[]
  };
  arquivos: string[];
};
