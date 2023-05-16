const mongoose = require("mongoose");

export const userSchema = new mongoose.Schema({
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

const User = mongoose.models.User || mongoose.model("User", userSchema, "Users");

export default User;
