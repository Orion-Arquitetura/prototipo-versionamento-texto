const mongoose = require("mongoose");

export const userSchema = new mongoose.Schema({
  userName: {
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
  },
  nivel: {
    type: String
  },
});

const User = mongoose.models.User || mongoose.model("User", userSchema, "Usuarios");

export default User;
