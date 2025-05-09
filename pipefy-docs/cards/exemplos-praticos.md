# Exemplos Práticos de Uso da API de Cards

## Cenários Comuns

### 1. Buscar Cards por Filtros
```graphql
query {
  pipe(id: "pipe_id") {
    cards(first: 10, search: {
      title: "Projeto",
      due_date_from: "2025-01-01",
      due_date_to: "2025-12-31",
      phase_id: "phase_id",
      labels: ["label_id"],
      assignee_ids: ["user_id"]
    }) {
      edges {
        node {
          id
          title
          due_date
          current_phase {
            name
          }
          assignees {
            user {
              name
            }
          }
        }
      }
    }
  }
}
```

### 2. Gerenciar Comentários
```graphql
# Adicionar Comentário
mutation {
  createComment(input: {
    card_id: "card_id",
    text: "Novo comentário com @menção e #tag"
  }) {
    comment {
      id
      text
      created_at
    }
  }
}

# Listar Comentários
query {
  card(id: "card_id") {
    comments(first: 20) {
      edges {
        node {
          id
          text
          created_at
          author {
            name
            email
          }
        }
      }
    }
  }
}
```

### 3. Gerenciar Anexos
```graphql
# Upload de Anexo
mutation {
  createAttachment(input: {
    card_id: "card_id",
    field_id: "field_id",
    url: "https://url-do-arquivo.com/documento.pdf",
    filename: "documento.pdf"
  }) {
    attachment {
      url
      filename
    }
  }
}

# Listar Anexos
query {
  card(id: "card_id") {
    attachments {
      url
      filename
      field {
        id
        label
      }
    }
  }
}
```

### 4. Atualizar Múltiplos Campos
```graphql
mutation {
  updateCard(input: {
    id: "card_id",
    fields_attributes: [
      {
        field_id: "campo_status",
        value: "Em Progresso"
      },
      {
        field_id: "campo_prioridade",
        value: "Alta"
      },
      {
        field_id: "campo_data",
        value: "2025-12-31"
      }
    ],
    assignee_ids: ["user_id1", "user_id2"],
    due_date: "2025-12-31"
  }) {
    card {
      id
      title
      fields {
        name
        value
      }
      assignees {
        user {
          name
        }
      }
      due_date
    }
  }
}
```

### 5. Clonar Card
```graphql
mutation {
  createCard(input: {
    pipe_id: "pipe_id",
    title: "Clone - Título Original",
    fields_attributes: [
      {
        field_id: "campo1",
        value: "valor1"
      }
    ],
    assignee_ids: ["user_id"],
    label_ids: ["label_id"],
    parent_ids: ["card_id_original"]
  }) {
    card {
      id
      title
      parent_relations {
        parent {
          id
          title
        }
      }
    }
  }
}
```

## Dicas de Uso

### 1. Paginação de Cards
```graphql
query {
  pipe(id: "pipe_id") {
    cards(first: 10, after: "cursor_here") {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        cursor
        node {
          id
          title
        }
      }
    }
  }
}
```

### 2. Busca Avançada
```graphql
query {
  allCards(first: 10, search: {
    pipe_id: "pipe_id",
    term: "termo de busca",
    created_at_from: "2025-01-01",
    created_at_to: "2025-12-31",
    updated_at_from: "2025-01-01",
    updated_at_to: "2025-12-31",
    overdue: true
  }) {
    edges {
      node {
        id
        title
        current_phase {
          name
        }
      }
    }
  }
}
```

### 3. Mover Card com Campos Adicionais
```graphql
mutation {
  moveCardToPhase(input: {
    card_id: "card_id",
    destination_phase_id: "phase_id",
    fields_attributes: [
      {
        field_id: "campo_motivo",
        value: "Aprovado"
      }
    ]
  }) {
    card {
      id
      current_phase {
        name
      }
    }
  }
}
```

## Tratamento de Erros

### Exemplo de Resposta com Erro
```json
{
  "errors": [
    {
      "message": "Card não encontrado",
      "locations": [{"line": 2, "column": 3}],
      "path": ["card"],
      "extensions": {
        "code": "NOT_FOUND"
      }
    }
  ]
}
```

## Melhores Práticas

1. **Validação de Campos**
   - Sempre valide os campos antes de enviar
   - Verifique os tipos corretos de dados
   - Considere as restrições do pipe

2. **Performance**
   - Solicite apenas os campos necessários
   - Use paginação para grandes conjuntos de dados
   - Agrupe mutações relacionadas

3. **Segurança**
   - Não exponha IDs sensíveis
   - Valide permissões antes das operações
   - Use HTTPS para todas as requisições

4. **Manipulação de Datas**
   - Use formato ISO 8601
   - Considere fusos horários
   - Valide datas antes de enviar

5. **Cache**
   - Implemente cache para consultas frequentes
   - Invalide cache após mutações
   - Use políticas de cache adequadas
