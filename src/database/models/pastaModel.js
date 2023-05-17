import mongoose from "mongoose";

const pastaSchema = mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    dataCriacao: {
        type: Date,
        default: Date.now
    },
    projeto: {
        type: [{type: mongoose.Schema.Types.ObjectId, ref: "Projeto"}],
    },
    arquivos: {
        type: [{type: mongoose.Schema.Types.ObjectId, ref: "Arquivo"}],
        default: []
    }
})

const Pasta = mongoose.models.Pasta || mongoose.model("Pasta", pastaSchema, "Pastas");

export default Pasta