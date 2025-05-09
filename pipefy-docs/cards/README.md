# Documentação da API de Cards do Pipefy

## Visão Geral
Esta documentação detalha os endpoints relacionados a Cards na API do Pipefy. Cards são os itens que fluem através dos pipes, representando tarefas, processos ou qualquer outro tipo de item que precise ser rastreado.

## Índice

1. [Introdução](#introdução)
2. [Autenticação](#autenticação)
3. [Endpoints](#endpoints)
4. [Exemplos](#exemplos)

## Introdução

Cards são a unidade básica de trabalho no Pipefy. Cada card pode conter:
- Campos personalizados
- Anexos
- Comentários
- Histórico de atividades
- Labels
- Responsáveis
- Datas de início/fim

## Autenticação

Para acessar a API do Pipefy, é necessário um token de autenticação. Este token deve ser incluído no header da requisição:

```graphql
Authorization: Bearer {seu_token}
```

## Endpoints

### Consultar Card
```graphql
query {
  card(id: "card_id") {
    id
    title
    current_phase {
      id
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
```

### Criar Card
```graphql
mutation {
  createCard(input: {
    pipe_id: "pipe_id",
    title: "Novo Card",
    fields_attributes: [
      {
        field_id: "field_id",
        value: "valor"
      }
    ]
  }) {
    card {
      id
      title
    }
  }
}
```

### Atualizar Card
```graphql
mutation {
  updateCard(input: {
    id: "card_id",
    title: "Título Atualizado",
    fields_attributes: [
      {
        field_id: "field_id",
        value: "novo valor"
      }
    ]
  }) {
    card {
      id
      title
    }
  }
}
```

### Mover Card
```graphql
mutation {
  moveCardToPhase(input: {
    card_id: "card_id",
    destination_phase_id: "phase_id"
  }) {
    card {
      id
      current_phase {
        id
        name
      }
    }
  }
}
```

### Deletar Card
```graphql
mutation {
  deleteCard(input: {
    id: "card_id"
  }) {
    success
  }
}
```

## Exemplos

### Exemplo de Consulta Completa
```graphql
query {
  card(id: "card_id") {
    id
    title
    due_date
    created_at
    updated_at
    finished_at
    expired
    late
    current_phase {
      id
      name
    }
    fields {
      name
      value
      field {
        id
        type
        label
      }
    }
    assignees {
      user {
        id
        name
        email
      }
    }
    labels {
      id
      name
      color
    }
    comments {
      text
      created_at
      author {
        name
      }
    }
    attachments {
      url
      filename
    }
  }
}
```

### Exemplo de Criação com Campos Complexos
```graphql
mutation {
  createCard(input: {
    pipe_id: "pipe_id",
    title: "Novo Projeto",
    due_date: "2025-12-31",
    fields_attributes: [
      {
        field_id: "nome_cliente",
        value: "Cliente A"
      },
      {
        field_id: "valor_projeto",
        value: "50000"
      },
      {
        field_id: "prioridade",
        value: "Alta"
      }
    ],
    assignee_ids: ["user_id1", "user_id2"],
    label_ids: ["label_id1", "label_id2"]
  }) {
    card {
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
      labels {
        name
      }
    }
  }
}
```

## Observações Importantes

1. Todos os campos ID são strings únicas
2. As datas devem estar no formato ISO 8601
3. As mutações podem retornar erros de validação
4. Alguns campos podem requerer permissões específicas
5. O card deve pertencer a um pipe existente
6. As atualizações de campos seguem as regras de validação definidas no pipe
7. A movimentação de cards pode estar sujeita a automações do pipe
