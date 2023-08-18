import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
    unique: true,
  },
  dataCriacao: {
    type: Date,
    default: Date.now,
  },
  clientesResponsaveis: {
    type: [
      {
        nome: String,
        id: { type: mongoose.Schema.Types.ObjectId, ref: "UserCliente" }
      }
    ],
    default: []
  },
  lider: {
    nome: String,
    id: { type: mongoose.Schema.Types.ObjectId, ref: "UserFuncionario" }
  },
  projetistas: {
    type: [
      {
        nome: String,
        id: { type: mongoose.Schema.Types.ObjectId, ref: "UserFuncionario" }
      }
    ],
    default: []
  },
  usuarios: {
    type: [
      {
        nome: String,
        id: { type: mongoose.Schema.Types.ObjectId, ref: "UserFuncionario" },
      },
    ],
    default: [],
  },
  arquivos: {
    type: [{ disciplina: String, id: { type: mongoose.Schema.Types.ObjectId, ref: "Arquivos.files" } }],
    default: [],
  },
});

const Projeto =
  mongoose.models.Projeto || mongoose.model("Projeto", projectSchema, "Projetos");

export default Projeto;
