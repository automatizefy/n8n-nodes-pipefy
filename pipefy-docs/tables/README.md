# Documentação da API de Tables do Pipefy

## Visão Geral
Esta documentação detalha os endpoints relacionados a Tables (Tabelas) na API do Pipefy. Tables são estruturas de dados que permitem armazenar e gerenciar informações de forma tabular, similares a planilhas.

## Índice

1. [Introdução](#introdução)
2. [Autenticação](#autenticação)
3. [Endpoints](#endpoints)
4. [Exemplos](#exemplos)

## Introdução

Tables são componentes do Pipefy que permitem:
- Armazenar dados tabulares
- Definir esquemas personalizados
- Relacionar registros com cards
- Importar/exportar dados
- Gerenciar permissões de acesso

## Autenticação

Para acessar a API do Pipefy, é necessário um token de autenticação. Este token deve ser incluído no header da requisição:

```graphql
Authorization: Bearer {seu_token}
```

## Endpoints

### Consultar Tabela
```graphql
query {
  table(id: "table_id") {
    id
    name
    description
    records_count
    created_at
    updated_at
    authorization {
      can_manage_table
      can_create_record
      can_delete_record
    }
    fields {
      id
      label
      type
      required
    }
  }
}
```

### Criar Tabela
```graphql
mutation {
  createTable(input: {
    organization_id: "org_id",
    name: "Nova Tabela",
    description: "Descrição da tabela",
    public: false,
    fields: [
      {
        label: "Nome",
        type: "short_text",
        required: true
      },
      {
        label: "Email",
        type: "email",
        required: true
      }
    ]
  }) {
    table {
      id
      name
      fields {
        id
        label
      }
    }
  }
}
```

### Atualizar Tabela
```graphql
mutation {
  updateTable(input: {
    id: "table_id",
    name: "Nome Atualizado",
    description: "Nova descrição",
    public: true
  }) {
    table {
      id
      name
      description
      public
    }
  }
}
```

### Deletar Tabela
```graphql
mutation {
  deleteTable(input: {
    id: "table_id"
  }) {
    success
  }
}
```

## Exemplos

### Exemplo de Tabela Completa
```graphql
query {
  table(id: "table_id") {
    id
    name
    description
    created_at
    updated_at
    
    fields {
      id
      label
      type
      required
      help
      description
      options {
        id
        name
      }
    }
    
    records(first: 10) {
      edges {
        node {
          id
          title
          created_at
          updated_at
          fields {
            field {
              label
            }
            value
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
    
    authorization {
      can_manage_table
      can_create_record
      can_update_record
      can_delete_record
    }
  }
}
```

### Exemplo de Criação com Campos Complexos
```graphql
mutation {
  createTable(input: {
    organization_id: "org_id",
    name: "Cadastro de Clientes",
    description: "Tabela para gestão de clientes",
    public: false,
    fields: [
      {
        label: "Nome",
        type: "short_text",
        required: true,
        help: "Nome completo do cliente"
      },
      {
        label: "Tipo de Cliente",
        type: "select",
        required: true,
        options: [
          { name: "Pessoa Física" },
          { name: "Pessoa Jurídica" }
        ]
      },
      {
        label: "CPF/CNPJ",
        type: "cnpj",
        required: true
      },
      {
        label: "Email",
        type: "email",
        required: true
      },
      {
        label: "Telefone",
        type: "phone",
        required: true
      },
      {
        label: "Endereço",
        type: "long_text",
        required: false
      }
    ]
  }) {
    table {
      id
      name
      fields {
        id
        label
        type
      }
    }
  }
}
```

## Observações Importantes

1. Tables podem ter múltiplos tipos de campos
2. Os registros podem ser relacionados a cards
3. É possível importar dados de outras fontes
4. Os campos podem ter validações específicas
5. As permissões podem ser configuradas por usuário
6. Os dados podem ser exportados em diferentes formatos
7. As tabelas suportam busca e filtragem avançada
