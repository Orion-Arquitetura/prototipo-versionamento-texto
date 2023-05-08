const mongoose = require("mongoose");

const AdministradorSchema = new mongoose.Schema({
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
    default: "senha"
  },
  nivel: {
    type: String,
    enum: ["functionario", "administrador", "cliente"],
    default: "administrador"
  },
})

const Administrador = mongoose.models.Administrador || mongoose.model("Administrador", AdministradorSchema, "Administradores");

export default Administrador;