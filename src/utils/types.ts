export type FuncionarioUser = {
  _id: string;
  nome: string;
  email: string;
  tipo: "funcionario" | "administrador";
  projetos: {
    projeto: Projeto;
    roles: Array<"projetista" | "lider" | "funcionario">;
  }[];
  tarefas: {
    concluidas: [
      {
        arquivo: {
          nome: string;
          id: string;
        };
        prazo: string;
        dataRequerimento: string;
        dataConclusao: string;
        projeto: {
          nome: string;
          id: string;
        };
        textoRequerimento: string;
        textoResposta: string;
      }
    ];
    emAndamento: [
      {
        arquivo: {
          nome: string;
          id: string;
        };
        dataRequerimento: string;
        prazo: string;
        projeto: {
          nome: string;
          id: string;
        };
        textoRequerimento: string;
      }
    ];
  };
  dataCriacao: string;
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
  dataCriacao: string;
  usuarios: {
    lider: FuncionarioUser,
    projetistas: FuncionarioUser[],
    clientes: ClienteUser[],
    outros: FuncionarioUser[]
  };
  arquivos: string[];
};
