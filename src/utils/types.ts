export type FuncionarioUser = {
  _id: string;
  nome: string;
  email: string;
  tipo: "funcionario" | "administrador";
  projetos: {
    nome: string;
    id: string;
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
    nome: string;
    id: string;
    roles: "cliente";
  }[];
  dataCriacao: string;
};

export type Projeto = {
  _id: string;
  nome: string;
  dataCriacao: string;
  usuarios: {
    nome: string;
    id: string;
    roles: Array<"cliente" | "projetista" | "lider" | "funcionario">;
  }[];
  arquivos: string[];
};
