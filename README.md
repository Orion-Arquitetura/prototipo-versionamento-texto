ESTRUTURA:
    1. PAGINA INICIAL (LOGIN)
    2. PÁGINA PARA ESCOLHER PROJETO
    3. PÁGINA PARA ESCOLHER DISCIPLINA DENTRO DO PROJETO
    4. PÁGINA EXIBINDO TODOS OS ARQUIVOS DA DISCIPLINA SELECIONADA DENTRO DO PROJETO SELECIONADO

PERMISSÕES:
    ADMIN: 
        - CRIAR NOVO USUÁRIO 
        - DELETAR USUÁRIO 
        - MODIFICAR PERMISSOES DE USUÁRIO 
        - CRIAR NOVO PROJETO - EXCLUIR PROJETO 
        - EDITAR NOME DO PROJETO 
        - CRIAR DISCIPLINA DENTRO DE UM PROJETO 
        - EXCLUIR DISCIPLINA DENTRO DE UM PROJETO 
        - EDITAR NOME DE DISCIPLINA DENTRO DE UM PROJETO 
        - EDITAR ARQUIVO 
        - EXCLUIR ARQUIVO 
        - ATRIBUIR TAREFA DE EDITAR ARQUIVO À UM USUÁRIO

ESQUEMA DO USUÁRIO ADMINISTRADOR NO BANCO DE DADOS:
    {
        "userName": "Admin",
        "email": "admin@orionarquitetura.com",
        "senha": "admin",
        "nivel": "admin"
    }

ESQUEMA DO USUÁRIO COMUM NO BANCO DE DADOS
    {
        "userName": "Joao Pedro",
        "email": "jp@orionarquitetura.com",
        "senha": "!@#$%*",
        "nivel": "funcionario",
        "atribuicoes": [
            {
                "atividade": "revisar",
                "atribuidaEm": "22/03/2023 às 11:16",
                "projeto": "Oftalmologia",
                "disciplina": "ARQ",
                "etapa": "PE"
            }
        ]
    }

PRÓXIMOS PASSOS:
    RESTRINGIR ROTAS NAO PERMITIDAS PARA QUEM NAO ESTÁ LOGADO.
    