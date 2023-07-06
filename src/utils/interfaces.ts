export interface User {
  _id: string;
  nome: string;
  email: string;
  tipo: "funcionario" | "cliente" | "administrador";
  permissoes: { projetos: [{ nome: string; id: string }]; arquivos: string[] };
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
  tipo: string;
  disciplina: string;
  etapa: string;
  conteudo: string;
  projeto: [{ nome: string; id: string }];
  versao: 0;
  ultimaVersao: boolean;
  criadoPor: [{ userName: string; userId: string }];
  dataCriacao: string;
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
  permissoes: { projetos: [{ nome: string; id: string }]; arquivos: string[] };
}
