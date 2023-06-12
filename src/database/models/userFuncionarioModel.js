import mongoose from "mongoose";

export const userFuncionarioSchema = mongoose.Schema({
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
  permissoes: {
    projetos: [
      { nome: String, id: { type: mongoose.Schema.Types.ObjectId, ref: "Projeto" } },
    ],
    arquivos: [
      {
        id: { type: mongoose.Schema.Types.ObjectId, ref: "Arquivo" },
        operacoes: {
          type: [String],
          enum: ["create", "read", "update", "delete"],
        },
      },
    ],
  },
});

export const UserFuncionario =
  mongoose.models.UserFuncionario ||
  mongoose.model("UserFuncionario", userFuncionarioSchema, "Users");
