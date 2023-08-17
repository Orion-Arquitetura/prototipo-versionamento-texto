export type User = {
  _id: string;
  nome: string;
  email: string;
  tipo: "funcionario" | "cliente" | "administrador";
  projetos: [{ nome: string; id: string }];
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

export type Projeto = {
  _id: string;
  nome: string;
  dataCriacao: string;
  clientesResponsaveis: [{ nome: string; id: string }];
  lideres: [{ nome: string; id: string }];
  projetistas: [{ nome: string; id: string }];
  usuarios: [{ nome: string; id: string }];
  arquivos: string[];
};
