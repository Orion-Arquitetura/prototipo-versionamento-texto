const mongoose = require("mongoose");

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
  usuarios: {
    type: [
      {
        nome: String,
        id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      },
    ],
    required: true,
    default: [],
  },
  arquivos: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Arquivo" }],
    default: [],
  },
});

const Projeto =
  mongoose.models.Projeto || mongoose.model("Projeto", projectSchema, "Projetos");

export default Projeto;
