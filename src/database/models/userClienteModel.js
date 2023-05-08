const mongoose = require("mongoose");

const clienteSchema = new mongoose.Schema({
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
    enum: ["funcionario", "administrador", "cliente"],
    default: "cliente"
  },
})

const Cliente = mongoose.models.Cliente || mongoose.model("Cliente", clienteSchema, "Clientes");

export default Cliente;
