const mongoose = require("mongoose");

const funcionarioSchema = new mongoose.Schema({
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
    default: "funcionario"
  },
})

const Funcionario = mongoose.models.Funcionario || mongoose.model("Funcionario", funcionarioSchema, "Funcionarios");

export default Funcionario;
