export const users = [
    {
        nomeUsuario: "admin",
        email: "admin@orionarquitetura.com",
        senha: "admin",
        permissoes: [
            "criar projeto",
            "adicionar usuario",
            "remover usuario",
            "editar arquivo",
            "visualizar arquivo"
        ],
        edicao: {
            estaEditando: false,
            arquivos: []
        }
    },
    {
        nomeUsuario: "Joao Pedro",
        email: "jp@orionarquitetura.com",
        senha: "jporion",
        permissoes: [
            "editar arquivo",
            "visualizar arquivo",
            "upload arquivo"
        ],
        edicao: {
            estaEditando: true,
            arquivos: [
                {
                    projeto: "OFTALMOLOGIA",
                    disciplina: "arquitetura",
                }
            ]
        }
    },
    {
        nomeUsuario: "Marcos Henrique",
        email: "mh@orionarquitetura.com",
        senha: "mhorion",
        permissoes: [
            "visualizar arquivo"
        ],
        edicao: {
            estaEditando: false,
            arquivos: []
        }
    }
]