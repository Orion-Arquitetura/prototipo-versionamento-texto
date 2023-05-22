const mongoose = require("mongoose");

const filtroSchema = mongoose.Schema({
  nome: {
    type: String,
    required: true,
    unique: true,
  },
  lista: {
    type: [String],
    required: true,
  },
});

const Filtro =
  mongoose.models.Filtro || mongoose.model("Filtro", filtroSchema, "Filtros");

export default Filtro;
