import mongoose from "mongoose";

export const userClienteSchema = mongoose.Schema({
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
    default: "cliente",
  },
  permissoes: {
    projetos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Projeto" }],
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
  dataCriacao: {
    type: Date,
    default: Date.now,
  },
});

export const UserCliente =
  mongoose.models.UserCliente ||
  mongoose.model("UserCliente", userClienteSchema, "Users");
