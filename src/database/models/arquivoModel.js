const mongoose = require("mongoose");

const arquivoSchema = mongoose.Schema({
  nome: {
    type: String,
  },
  dataCriacao: {
    type: Date,
    default: Date.now,
  },
  tipo: {
    type: String,
    enum: ["", "MED", "CAD", "ORC", "CRO", "SIN", "ANA", "LSD", "LSM", "LSP", "COT"],
  },
  disciplina: {
    type: String,
    enum: [
      "",
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
    enum: ["LV", "EP", "AP", "PB", "PE"],
  },
  conteudo: {
    type: Object,
    enum: [
      "PLA.LOC",
      "PLA.SIT",
      "PLA.LOA",
      "PLA.LEV",
      "PLA.SET",
      "PLA.IMP",
      "PLA.LAY",
      "PLA.ACB",
      "PLA.DEM",
      "PLA.COB",
      "PLA.PIS",
      "PLA.FOR",
      "PTO.ELE",
      "PLA.MOB",
      "PTO.HID",
      "PTO.LOG",
      "PTO.GAS",
      "PTO.ESG",
      "PLA.TET",
      "PLA.LUM",
      "PLA.FUR",
      "CRT.AA.BB",
      "ELV.1.2",
      "PRS.1.4",
      "AMP.GER",
      "AMP.SAN",
      "DET.GER",
      "DET.MAR",
    ],
  },
  projeto: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Projeto",
      required: true,
    },
    nome: {
      type: String,
      required: true,
    },
  },
  versao: {
    type: Number,
    required: true
  },
  ultimaVersao: {
    type: Boolean,
    default: true
  },
  criadoPor: {
    userName: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  comentario: {
    type: String,
  },
});

const Arquivo =
  mongoose.models.Arquivo || mongoose.model("Arquivo", arquivoSchema, "Arquivos");

export default Arquivo;
