import mongoose from "mongoose";

export const userFuncionarioSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  senha: {
    type: String,
    required: true,
    trim: true,
    default: "senha",
  },
  tipo: {
    type: String,
    default: "funcionario",
  },
  projetos: [
    { nome: String, id: { type: mongoose.Schema.Types.ObjectId, ref: "Projeto" } },
  ],
  tarefas: {
    concluidas: {
      revisao: [
        {
          arquivo: {
            nome: String,
            id: { type: mongoose.Schema.Types.ObjectId, ref: "Arquivo" },
          },
          prazo: Date,
          dataConclusao: {
            type: Date,
            default: Date.now
          },
          projeto: {
            nome: String,
            id: { type: mongoose.Schema.Types.ObjectId, ref: "Projeto" },
          },
        },
      ],
      novaVersao: [
        {
          arquivo: {
            nome: String,
            id: { type: mongoose.Schema.Types.ObjectId, ref: "Arquivo" },
          },
          dataConclusao: {
            type: Date,
            default: Date.now
          },
          prazo: Date,
          projeto: {
            nome: String,
            id: { type: mongoose.Schema.Types.ObjectId, ref: "Projeto" },
          },
        },
      ],
    },
    emAndamento: {
      revisao: [
        {
          arquivo: {
            nome: String,
            id: { type: mongoose.Schema.Types.ObjectId, ref: "Arquivo" },
          },
          prazo: Date,
          projeto: {
            nome: String,
            id: { type: mongoose.Schema.Types.ObjectId, ref: "Projeto" },
          },
        },
      ],
      novaVersao: [
        {
          arquivo: {
            nome: String,
            id: { type: mongoose.Schema.Types.ObjectId, ref: "Arquivo" },
          },
          prazo: Date,
          projeto: {
            nome: String,
            id: { type: mongoose.Schema.Types.ObjectId, ref: "Projeto" },
          },
        },
      ],
    },
  },
  dataCriacao: {
    type: Date,
    default: Date.now,
  },
});

export const UserFuncionario =
  mongoose.models.UserFuncionario ||
  mongoose.model("UserFuncionario", userFuncionarioSchema, "Users");
