export interface User {
  _id: string;
  nome: string;
  email: string;
  tipo: "funcionario" | "cliente" | "administrador";
  projetos: [{ nome: string; id: string }];
  tarefas: {
    concluidas: {
      revisao: [
        {
          arquivo: {
            nome: string;
            id: string;
          };
          dataConclusao: string;
          prazo: string;
          projeto: {
            nome: string;
            id: string;
          };
        }
      ];
      novaVersao: [
        {
          arquivo: {
            nome: string;
            id: string;
          };
          dataConclusao: string;
          prazo: string;
          projeto: {
            nome: string;
            id: string;
          };
        }
      ];
    };
    emAndamento: {
      revisao: [
        {
          arquivo: {
            nome: string;
            id: string;
          };
          prazo: string;
          projeto: {
            nome: string;
            id: string;
          };
        }
      ];
      novaVersao: [
        {
          arquivo: {
            nome: string;
            id: string;
          };
          prazo: string;
          projeto: {
            nome: string;
            id: string;
          };
        }
      ];
    };
  };
  dataCriacao: string;
}

export interface Projeto {
  _id: string;
  nome: string;
  dataCriacao: string;
  usuarios: [{ nome: string; id: string }];
  arquivos: string[];
}

export interface Arquivo {
  _id: string;
  nome: string;
  dataCriacao: string;
  tipo: string;
  disciplina: string;
  etapa: string;
  conteudo: string;
  projeto: [{ nome: string; id: string }];
  versao: 0;
  ultimaVersao: boolean;
  novaVersaoSolicitada?: boolean;
  responsavelNovaVersao?: {
    nome: string;
    id: string;
  };
  prazoNovaVersao?: string;
  emRevisao?: boolean;
  responsavelRevisao?: {
    nome: string;
    id: string;
  };
  prazoRevisao?: string;
  comentario: string;
  criadoPor: { userName: string; userId: string };
}

export interface signInData {
  email: string;
  senha: string;
}

export interface AuthContextUserData {
  nome: string;
  email: string;
  tipo: "funcionario" | "cliente" | "administrador";
  id: string;
  token: string;
  projetos: [{ nome: string; id: string }];
  tarefas: {
    concluidas: {
      revisao: [
        {
          arquivo: {
            nome: string;
            id: string;
          };
          dataConclusao: string;
          prazo: string;
          projeto: {
            nome: string;
            id: string;
          };
        }
      ];
      novaVersao: [
        {
          arquivo: {
            nome: string;
            id: string;
          };
          dataConclusao: string;
          prazo: string;
          projeto: {
            nome: string;
            id: string;
          };
        }
      ];
    };
    emAndamento: {
      revisao: [
        {
          arquivo: {
            nome: string;
            id: string;
          };
          prazo: string;
          projeto: {
            nome: string;
            id: string;
          };
        }
      ];
      novaVersao: [
        {
          arquivo: {
            nome: string;
            id: string;
          };
          prazo: string;
          projeto: {
            nome: string;
            id: string;
          };
        }
      ];
    };
  };
}
