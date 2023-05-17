const mongoose = require("mongoose");

const projectSchema = mongoose.Schema({
  nome: {
    type: String,
    required: true,
    unique: true,
  },
  dataCriacao: {
    type: Date,
    default: Date.now,
  },
  funcionariosPermitidos: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    required: true,
    default: [],
  },
  pastas: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Pasta" }],
    default: []
  },
});

const Projeto =
  mongoose.models.Projeto || mongoose.model("Projeto", projectSchema, "Projetos");

export default Projeto;
