import mongoose from "mongoose";

export const userFuncionarioSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
    maxLength: 40
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    maxLength: 40
  },
  senha: {
    type: String,
    required: true,
    default: "senha",
    maxLength: 12
  },
  tipo: {
    type: String,
    default: "funcionario",
  },
  projetos: [
    { nome: String, id: { type: mongoose.Schema.Types.ObjectId, ref: "Projeto" } },
  ],
  tarefas: {
    concluidas: [
      {
        arquivo: {
          nome: String,
          id: { type: mongoose.Schema.Types.ObjectId, ref: "Arquivo" },
        },
        prazo: String,
        dataRequerimento: String,
        dataConclusao: String,
        projeto: {
          nome: String,
          id: { type: mongoose.Schema.Types.ObjectId, ref: "Projeto" },
        },
        textoRequerimento: String,
        textoResposta: String
      },
    ]
    ,
    emAndamento: [
      {
        arquivo: {
          nome: String,
          id: { type: mongoose.Schema.Types.ObjectId, ref: "Arquivo" },
        },
        dataRequerimento: String,
        prazo: String,
        projeto: {
          nome: String,
          id: { type: mongoose.Schema.Types.ObjectId, ref: "Projeto" },
        },
        textoRequerimento: String
      },
    ],
  },
  dataCriacao: {
    type: Date,
    default: Date.now,
  },
});

const UserFuncionario =
  mongoose.models.UserFuncionario ||
  mongoose.model("UserFuncionario", userFuncionarioSchema, "Users");

export default UserFuncionario