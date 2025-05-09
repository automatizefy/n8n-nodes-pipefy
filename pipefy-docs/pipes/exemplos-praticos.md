# Exemplos Práticos de Uso da API de Pipes

## Cenários Comuns

### 1. Listar Todos os Pipes da Organização
```graphql
query {
  organization(id: "org_id") {
    pipes {
      edges {
        node {
          id
          name
          phases_count
          cards_count
          created_at
        }
      }
    }
  }
}
```

### 2. Buscar Cards em um Pipe Específico
```graphql
query {
  pipe(id: "pipe_id") {
    cards(first: 10) {
      edges {
        node {
          id
          title
          current_phase {
            name
          }
          fields {
            name
            value
          }
          created_at
          updated_at
        }
      }
    }
  }
}
```

### 3. Consultar Membros e Permissões
```graphql
query {
  pipe(id: "pipe_id") {
    members {
      user {
        id
        name
        email
      }
      role_name
      can_create_cards
      can_update_cards
      can_delete_cards
    }
  }
}
```

### 4. Atualizar Configurações do Pipe
```graphql
mutation {
  updatePipe(input: {
    id: "pipe_id",
    name: "Novo Nome do Processo",
    description: "Nova descrição detalhada",
    public: false,
    anyone_can_create_card: false
  }) {
    pipe {
      id
      name
      description
      public
      anyone_can_create_card
    }
  }
}
```

### 5. Adicionar Campos Personalizados
```graphql
mutation {
  createPipeField(input: {
    pipe_id: "pipe_id",
    type: "short_text",
    label: "Novo Campo",
    description: "Descrição do campo",
    required: true
  }) {
    field {
      id
      type
      label
      required
    }
  }
}
```

## Dicas de Uso

1. **Paginação**
   - Use `first` e `after` para paginar resultados
   - O cursor `after` é obtido do `endCursor` da página anterior
   ```graphql
   query {
     pipe(id: "pipe_id") {
       cards(first: 10, after: "cursor_here") {
         pageInfo {
           hasNextPage
           endCursor
         }
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

2. **Filtragem de Cards**
   ```graphql
   query {
     pipe(id: "pipe_id") {
       cards(first: 10, search: {
         title: "Termo de busca",
         due_date: "2025-05-09"
       }) {
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

3. **Ordenação**
   ```graphql
   query {
     pipe(id: "pipe_id") {
       cards(first: 10, sort_by: "created_at", sort_order: "DESC") {
         edges {
           node {
             id
             title
             created_at
           }
         }
       }
     }
   }
   ```

## Tratamento de Erros

Exemplo de resposta com erro:
```json
{
  "errors": [
    {
      "message": "Pipe não encontrado",
      "locations": [{"line": 2, "column": 3}],
      "path": ["pipe"],
      "extensions": {
        "code": "NOT_FOUND"
      }
    }
  ]
}
```

## Melhores Práticas

1. **Cache**
   - Armazene em cache resultados que não mudam frequentemente
   - Use variáveis para queries dinâmicas

2. **Rate Limiting**
   - Implemente retry com exponential backoff
   - Monitore limites de requisição

3. **Segurança**
   - Nunca exponha tokens de autenticação
   - Valide inputs antes de enviar
   - Use HTTPS para todas as requisições
