import mongoose from "mongoose";

export const DisciplinaSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
        unique: true
    },
    sigla: {
        type: String,
        required: true,
        unique: true
    },
})

const Disciplina = mongoose.models.Disciplina || mongoose.model("Disciplina", DisciplinaSchema, "Disciplinas")

export default Disciplina 