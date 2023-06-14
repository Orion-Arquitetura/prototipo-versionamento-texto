import mongoose from "mongoose";

export const userAdministradorSchema = mongoose.Schema({
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
    default: "administrador",
  },
  dataCriacao: {
    type: Date,
    default: Date.now,
  },
});

export const UserAdministrador =
  mongoose.models.UserAdministrador ||
  mongoose.model("UserAdministrador", userAdministradorSchema, "Users");
