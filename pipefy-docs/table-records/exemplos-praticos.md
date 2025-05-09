# Exemplos Práticos de Uso da API de Table Records

## Cenários Comuns

### 1. Operações Básicas com Registros
```graphql
# Criar Registro Simples
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
      }
    ]
  }) {
    table_record {
      id
      title
    }
  }
}

# Atualizar Registro
mutation {
  updateTableRecord(input: {
    id: "record_id",
    fields_attributes: [
      {
        field_id: "status",
        value: "Ativo"
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

# Buscar Registro com Detalhes
query {
  tableRecord(id: "record_id") {
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
    created_by {
      name
      email
    }
  }
}
```

### 2. Manipulação de Campos Complexos
```graphql
mutation {
  createTableRecord(input: {
    table_id: "table_id",
    title: "Projeto XYZ",
    fields_attributes: [
      # Campo de Array
      {
        field_id: "participantes",
        value: ["João", "Maria", "Pedro"]
      },
      # Campo de Data/Hora
      {
        field_id: "data_inicio",
        value: "2025-05-09T10:00:00Z"
      },
      # Campo de Moeda
      {
        field_id: "orcamento",
        value: "15000.50"
      },
      # Campo de Seleção Múltipla
      {
        field_id: "tecnologias",
        value: ["Python", "JavaScript", "GraphQL"]
      },
      # Campo de Anexos
      {
        field_id: "documentacao",
        attachments: [
          {
            url: "https://exemplo.com/doc1.pdf",
            filename: "especificacao.pdf"
          }
        ]
      }
    ]
  }) {
    table_record {
      id
      fields {
        field {
          label
        }
        value
        array_value
        datetime_value
      }
    }
  }
}
```

### 3. Relacionamentos com Cards
```graphql
mutation {
  createTableRecord(input: {
    table_id: "table_id",
    title: "Cliente ABC",
    fields_attributes: [
      {
        field_id: "nome_empresa",
        value: "ABC Ltda"
      }
    ],
    connected_cards: [
      {
        pipe_id: "pipe_id",
        phase_id: "phase_id",
        fields_attributes: [
          {
            field_id: "projeto",
            value: "Implementação Sistema"
          }
        ]
      }
    ]
  }) {
    table_record {
      id
      connected_cards {
        edges {
          node {
            id
            title
          }
        }
      }
    }
  }
}
```

### 4. Busca Avançada
```graphql
query {
  table(id: "table_id") {
    records(
      first: 10,
      search: {
        title: "Cliente",
        created_at_from: "2025-01-01",
        created_at_to: "2025-12-31",
        field_values: [
          {
            field_id: "status",
            value: "Ativo"
          },
          {
            field_id: "regiao",
            value: "Sul"
          }
        ]
      },
      sort_by: "created_at",
      sort_order: "DESC"
    ) {
      edges {
        node {
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
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
}
```

### 5. Importação em Lote
```graphql
mutation {
  importTableRecords(input: {
    table_id: "table_id",
    records: [
      {
        title: "Cliente 1",
        fields_attributes: [
          {
            field_id: "nome",
            value: "Empresa A"
          },
          {
            field_id: "cnpj",
            value: "12.345.678/0001-90"
          }
        ]
      },
      {
        title: "Cliente 2",
        fields_attributes: [
          {
            field_id: "nome",
            value: "Empresa B"
          },
          {
            field_id: "cnpj",
            value: "98.765.432/0001-10"
          }
        ]
      }
    ]
  }) {
    imported_records_count
    success_records {
      id
      title
    }
    failed_records {
      record
      errors
    }
  }
}
```

## Melhores Práticas

### 1. Validação de Dados
```graphql
# Exemplo com múltiplas validações
mutation {
  createTableRecord(input: {
    table_id: "table_id",
    title: "Novo Registro",
    fields_attributes: [
      {
        field_id: "email",
        value: "contato@empresa.com"
      },
      {
        field_id: "telefone",
        value: "+55 11 99999-9999"
      },
      {
        field_id: "valor",
        value: "1500.00"
      }
    ]
  }) {
    table_record {
      id
      fields {
        field {
          label
        }
        value
        validation_errors
      }
    }
  }
}
```

### 2. Tratamento de Erros
```graphql
mutation {
  createTableRecord(input: {
    table_id: "table_id",
    title: "Novo Registro",
    fields_attributes: [
      {
        field_id: "campo_obrigatorio",
        value: ""  # Valor inválido para testar erro
      }
    ]
  }) {
    table_record {
      id
      fields {
        field {
          label
        }
        value
        validation_errors
      }
    }
    errors {
      field_id
      message
    }
  }
}
```

## Dicas de Implementação

1. **Validação de Dados**
   - Verifique campos obrigatórios
   - Valide formatos específicos
   - Trate erros adequadamente

2. **Performance**
   - Use paginação em consultas
   - Limite campos retornados
   - Agrupe operações em lote

3. **Relacionamentos**
   - Gerencie conexões com cards
   - Mantenha consistência
   - Documente relacionamentos

4. **Manutenção**
   - Mantenha registros atualizados
   - Faça backup regularmente
   - Monitore alterações

5. **Segurança**
   - Valide permissões
   - Proteja dados sensíveis
   - Registre operações importantes
