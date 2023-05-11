const mongoose = require("mongoose");

const arquivoSchema = mongoose.Schema({
    nome: {
        type: String,
        required: true,
        unique: true
    },
    dataCriacao: {
        type: Date,
        default: Date.now
    },
    projeto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Projeto",
        required: true
    }
})

const Arquivo = mongoose.models.Arquivo || mongoose.model("Arquivo", arquivoSchema, "Arquivos")

export default Arquivo