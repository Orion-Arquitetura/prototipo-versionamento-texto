import mongoose from "mongoose";

export const projectSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
    unique: true,
  },
  dataCriacao: {
    type: Date,
    default: Date.now,
  },
  usuarios: {
    type: {
      lider: { type: mongoose.Schema.Types.ObjectId, ref: "UserFuncionario" },
      clientes: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: "UserCliente" }],
        default: []
      },
      projetistas: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: "UserFuncionario" }],
        default: []
      },
      outros: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: "UserFuncionario" }],
        default: []
      }
    },
    default: {
      lider: null,
      clientes: [],
      projetistas: [],
      outros: []
    }
  },
  arquivos: {
    type: [{ disciplina: String, id: { type: mongoose.Schema.Types.ObjectId, ref: "Arquivos.files" } }],
    default: [],
  },
});

const Projeto =
  mongoose.models.Projeto || mongoose.model("Projeto", projectSchema, "Projetos");

export default Projeto;
