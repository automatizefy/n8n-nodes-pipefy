# Documentação da API de Table Records do Pipefy

## Visão Geral
Esta documentação detalha os endpoints relacionados a Table Records (Registros de Tabela) na API do Pipefy. Table Records são os itens individuais armazenados em uma tabela, contendo dados estruturados conforme o esquema da tabela.

## Índice

1. [Introdução](#introdução)
2. [Autenticação](#autenticação)
3. [Endpoints](#endpoints)
4. [Exemplos](#exemplos)

## Introdução

Table Records são os dados armazenados em tabelas do Pipefy. Cada registro pode:
- Conter múltiplos campos
- Ser vinculado a cards
- Ter anexos
- Manter histórico de alterações
- Ser importado/exportado

## Autenticação

Para acessar a API do Pipefy, é necessário um token de autenticação. Este token deve ser incluído no header da requisição:

```graphql
Authorization: Bearer {seu_token}
```

## Endpoints

### Consultar Registro
```graphql
query {
  tableRecord(id: "record_id") {
    id
    title
    created_at
    updated_at
    fields {
      field {
        id
        label
      }
      value
    }
    record_fields {
      name
      value
    }
  }
}
```

### Criar Registro
```graphql
mutation {
  createTableRecord(input: {
    table_id: "table_id",
    title: "Novo Registro",
    fields_attributes: [
      {
        field_id: "field_id",
        value: "valor"
      }
    ]
  }) {
    table_record {
      id
      title
      fields {
        field {
          label
        }
        value
      }
    }
  }
}
```

### Atualizar Registro
```graphql
mutation {
  updateTableRecord(input: {
    id: "record_id",
    title: "Título Atualizado",
    fields_attributes: [
      {
        field_id: "field_id",
        value: "novo valor"
      }
    ]
  }) {
    table_record {
      id
      title
      fields {
        field {
          label
        }
        value
      }
    }
  }
}
```

### Deletar Registro
```graphql
mutation {
  deleteTableRecord(input: {
    id: "record_id"
  }) {
    success
  }
}
```

## Exemplos

### Exemplo de Registro Completo
```graphql
query {
  tableRecord(id: "record_id") {
    id
    title
    created_at
    updated_at
    created_by {
      id
      name
      email
    }
    
    # Campos do Registro
    fields {
      field {
        id
        label
        type
        description
      }
      value
      array_value
      datetime_value
    }
    
    # Cards Relacionados
    connected_cards {
      edges {
        node {
          id
          title
          pipe {
            name
          }
        }
      }
    }
    
    # Informações da Tabela
    table {
      id
      name
      description
    }
  }
}
```

### Exemplo de Criação com Campos Complexos
```graphql
mutation {
  createTableRecord(input: {
    table_id: "table_id",
    title: "Novo Cliente",
    fields_attributes: [
      {
        field_id: "nome",
        value: "João Silva"
      },
      {
        field_id: "email",
        value: "joao@email.com"
      },
      {
        field_id: "telefones",
        value: ["+55 11 99999-9999", "+55 11 88888-8888"]
      },
      {
        field_id: "data_cadastro",
        value: "2025-05-09T10:00:00Z"
      },
      {
        field_id: "documentos",
        attachments: [
          {
            url: "https://exemplo.com/doc1.pdf",
            filename: "documento1.pdf"
          }
        ]
      }
    ]
  }) {
    table_record {
      id
      title
      fields {
        field {
          label
        }
        value
      }
    }
  }
}
```

## Observações Importantes

1. Os registros devem seguir o esquema da tabela
2. Campos obrigatórios devem ser preenchidos
3. Validações específicas são aplicadas por tipo de campo
4. Registros podem ser vinculados a múltiplos cards
5. Histórico de alterações é mantido automaticamente
6. Anexos são suportados em campos específicos
7. Alguns campos podem ter formatação especial
