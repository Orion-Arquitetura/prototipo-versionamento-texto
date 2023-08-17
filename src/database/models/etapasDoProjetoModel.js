import mongoose from "mongoose";

export const EtapasDoProjetoSchema = new mongoose.Schema({
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

const EtapasDoProjeto = mongoose.models.EtapasDoProjeto || mongoose.model("EtapasDoProjeto", EtapasDoProjetoSchema, "EtapasDoProjetos")

export default EtapasDoProjeto 