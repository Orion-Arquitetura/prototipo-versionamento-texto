import mongoose from "mongoose";

export const userClienteSchema = new mongoose.Schema({
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
    default: "senha",
  },
  tipo: {
    type: String,
    default: "cliente",
  },
  projetos: [
    { nome: String, id: { type: mongoose.Schema.Types.ObjectId, ref: "Projeto" } },
  ],
  dataCriacao: {
    type: Date,
    default: Date.now,
  },
});

const UserCliente =
  mongoose.models.UserCliente ||
  mongoose.model("UserCliente", userClienteSchema, "Users");

export default UserCliente
