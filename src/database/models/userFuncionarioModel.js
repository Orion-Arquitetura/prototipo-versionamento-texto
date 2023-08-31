import mongoose from "mongoose";

export const userFuncionarioSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
    maxLength: 40,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    maxLength: 40,
  },
  senha: {
    type: String,
    required: true,
    default: "senha",
    maxLength: 12,
  },
  tipo: {
    type: String,
    default: "funcionario",
  },
  projetos: [
    {
      projeto: { type: mongoose.Schema.Types.ObjectId, ref: "Projeto" },
      roles: { type: [String], enum: ["funcionario", "lider", "projetista"], default: ["funcionario"] }
    },
  ],
  tarefas: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tarefa" }],
  dataCriacao: {
    type: Date,
    default: Date.now,
  },
});

const UserFuncionario =
  mongoose.models.UserFuncionario ||
  mongoose.model("UserFuncionario", userFuncionarioSchema, "Users");

export default UserFuncionario;
