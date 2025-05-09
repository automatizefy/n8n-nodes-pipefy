# Exemplos Práticos de Uso da API de Tables

## Cenários Comuns

### 1. Gerenciar Registros
```graphql
# Criar Registro
mutation {
  createTableRecord(input: {
    table_id: "table_id",
    title: "Novo Registro",
    fields_attributes: [
      {
        field_id: "campo_nome",
        value: "João Silva"
      },
      {
        field_id: "campo_email",
        value: "joao@email.com"
      },
      {
        field_id: "campo_telefone",
        value: "+55 11 99999-9999"
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

# Atualizar Registro
mutation {
  updateTableRecord(input: {
    id: "record_id",
    title: "Registro Atualizado",
    fields_attributes: [
      {
        field_id: "campo_email",
        value: "novo.email@email.com"
      }
    ]
  }) {
    table_record {
      id
      title
      updated_at
    }
  }
}

# Deletar Registro
mutation {
  deleteTableRecord(input: {
    id: "record_id"
  }) {
    success
  }
}
```

### 2. Buscar e Filtrar Registros
```graphql
query {
  table(id: "table_id") {
    records(
      first: 20,
      search: {
        title: "Cliente",
        created_at_from: "2025-01-01",
        created_at_to: "2025-12-31",
        field_values: [
          {
            field_id: "status",
            value: "Ativo"
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
          created_at
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

### 3. Importar Dados
```graphql
mutation {
  importTableRecords(input: {
    table_id: "table_id",
    records: [
      {
        title: "Registro 1",
        fields_attributes: [
          {
            field_id: "campo1",
            value: "valor1"
          }
        ]
      },
      {
        title: "Registro 2",
        fields_attributes: [
          {
            field_id: "campo1",
            value: "valor2"
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

### 4. Relacionamentos com Cards
```graphql
mutation {
  createTableRecord(input: {
    table_id: "table_id",
    title: "Novo Cliente",
    fields_attributes: [
      {
        field_id: "nome",
        value: "Empresa XYZ"
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
      title
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

## Melhores Práticas

### 1. Validação de Campos
```graphql
mutation {
  createTableField(input: {
    table_id: "table_id",
    label: "CNPJ",
    type: "cnpj",
    required: true,
    help: "Insira um CNPJ válido",
    description: "CNPJ da empresa",
    minimal_length: 14,
    maximal_length: 14
  }) {
    table_field {
      id
      label
      type
      validation_rules {
        minimal_length
        maximal_length
      }
    }
  }
}
```

### 2. Filtros Avançados
```graphql
query {
  table(id: "table_id") {
    records(
      first: 10,
      search: {
        or: [
          {
            field_values: [
              {
                field_id: "status",
                value: "Ativo"
              }
            ]
          },
          {
            field_values: [
              {
                field_id: "tipo",
                value: "VIP"
              }
            ]
          }
        ],
        and: [
          {
            field_values: [
              {
                field_id: "regiao",
                value: "Sul"
              }
            ]
          }
        ]
      }
    ) {
      edges {
        node {
          id
          title
        }
      }
    }
  }
}
```

## Dicas de Implementação

1. **Planejamento da Estrutura**
   - Defina os campos necessários
   - Considere relacionamentos
   - Planeje validações
   - Estabeleça permissões

2. **Organização dos Dados**
   - Use títulos descritivos
   - Mantenha dados consistentes
   - Documente campos especiais
   - Implemente buscas eficientes

3. **Performance**
   - Use paginação adequada
   - Otimize consultas
   - Agrupe operações
   - Limite campos retornados

4. **Validações**
   - Implemente regras de negócio
   - Valide dados na entrada
   - Trate erros adequadamente
   - Mantenha consistência

5. **Integração**
   - Planeje importações
   - Defina formato de exportação
   - Gerencie relacionamentos
   - Documente integrações
