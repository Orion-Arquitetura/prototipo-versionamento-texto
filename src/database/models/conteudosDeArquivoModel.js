import mongoose from "mongoose";

export const ConteudosDeArquivoSchema = new mongoose.Schema({
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

const ConteudosDeArquivo = mongoose.models.ConteudosDeArquivo || mongoose.model("ConteudosDeArquivo", ConteudosDeArquivoSchema, "ConteudosDeArquivos")

export default ConteudosDeArquivo 