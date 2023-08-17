import mongoose from "mongoose";

export const TipoDeConteudoSchema = new mongoose.Schema({
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

const TiposDeConteudo= mongoose.models.TiposDeConteudo|| mongoose.model("TiposDeConteudo", TipoDeConteudoSchema, "TiposDeConteudo")

export default TiposDeConteudo