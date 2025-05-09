# Documentação da API de Pipes do Pipefy

## Visão Geral
Esta documentação detalha os endpoints relacionados a Pipes na API do Pipefy.

## Índice

1. [Introdução](#introdução)
2. [Autenticação](#autenticação)
3. [Endpoints](#endpoints)
4. [Exemplos](#exemplos)

## Introdução

Pipes são os fluxos de trabalho principais no Pipefy. Eles representam processos que podem conter múltiplas fases (cards) e campos customizados.

## Autenticação

Para acessar a API do Pipefy, é necessário um token de autenticação. Este token deve ser incluído no header da requisição:

```graphql
Authorization: Bearer {seu_token}
```

## Endpoints

### Consultar Pipe
```graphql
query {
  pipe(id: "pipe_id") {
    id
    name
    phases {
      id
      name
    }
    cards {
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

### Criar Pipe
```graphql
mutation {
  createPipe(input: {
    name: "Nome do Pipe",
    organization_id: "org_id"
  }) {
    pipe {
      id
      name
    }
  }
}
```

### Atualizar Pipe
```graphql
mutation {
  updatePipe(input: {
    id: "pipe_id",
    name: "Novo Nome"
  }) {
    pipe {
      id
      name
    }
  }
}
```

### Deletar Pipe
```graphql
mutation {
  deletePipe(input: {
    id: "pipe_id"
  }) {
    success
  }
}
```

## Exemplos

### Exemplo de Consulta Completa
```graphql
query {
  pipe(id: "pipe_id") {
    id
    name
    description
    members {
      user {
        id
        name
        email
      }
      role_name
    }
    phases {
      id
      name
      cards_count
      fields {
        id
        label
        type
      }
    }
    start_form_fields {
      id
      label
      type
      required
    }
  }
}
```

### Exemplo de Criação com Campos Personalizados
```graphql
mutation {
  createPipe(input: {
    name: "Processo de Vendas",
    organization_id: "org_id",
    start_form_fields: [
      {
        label: "Nome do Cliente",
        type: "short_text",
        required: true
      },
      {
        label: "Valor da Proposta",
        type: "currency",
        required: true
      }
    ]
  }) {
    pipe {
      id
      name
      start_form_fields {
        id
        label
        type
      }
    }
  }
}
```

## Observações Importantes

1. Todos os campos ID são strings únicas
2. As consultas e mutações seguem o padrão GraphQL
3. É possível customizar os campos retornados em cada consulta
4. Alguns campos podem requerer permissões específicas
5. Limite de requisições: consulte a documentação oficial para as últimas atualizações sobre rate limiting
