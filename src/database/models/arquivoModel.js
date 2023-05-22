const mongoose = require("mongoose");

const arquivoSchema = mongoose.Schema({
  nome: {
    type: String,
    required: true,
    unique: true,
  },
  dataCriacao: {
    type: Date,
    default: Date.now,
  },
  projeto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Projeto",
    required: true,
  },
  tipo: {
    type: String,
    required: true,
    enum: ["MED", "CAD", "ORC", "CRO", "SIN", "ANA", "LSD", "LSM", "LSP", "COT"],
  },
  disciplina: {
    type: String,
    required: true,
    enum: [
      "ACS",
      "LOG",
      "ARQ",
      "MEC",
      "PVI",
      "ORC",
      "ESG",
      "PDA",
      "HID",
      "PSG",
      "CRO",
      "EST",
      "DEC",
      "FND",
      "ELE",
      "SDG",
      "GAS",
      "TER",
      "IES",
      "TOP",
      "SIP",
      "IMP",
      "SEL",
      "LMT",
    ],
  },
  etapa: {
    type: String,
    required: true,
    enum: ["LV", "EP", "AP", "PB", "PE"],
  },
});

const Arquivo =
  mongoose.models.Arquivo || mongoose.model("Arquivo", arquivoSchema, "Arquivos");

export default Arquivo;
