# Documentação da API de Webhooks do Pipefy

## Visão Geral
Esta documentação detalha os endpoints relacionados a Webhooks na API do Pipefy. Webhooks permitem que você receba notificações em tempo real sobre eventos que ocorrem em sua organização no Pipefy.

## Índice

1. [Introdução](#introdução)
2. [Autenticação](#autenticação)
3. [Endpoints](#endpoints)
4. [Exemplos](#exemplos)

## Introdução

Webhooks no Pipefy permitem:
- Receber notificações em tempo real
- Integrar com sistemas externos
- Automatizar fluxos de trabalho
- Monitorar atividades
- Reagir a eventos específicos

## Autenticação

Para acessar a API do Pipefy, é necessário um token de autenticação. Este token deve ser incluído no header da requisição:

```graphql
Authorization: Bearer {seu_token}
```

## Endpoints

### Consultar Webhooks
```graphql
query {
  organization(id: "org_id") {
    webhooks {
      edges {
        node {
          id
          url
          actions
          headers
          is_active
          created_at
        }
      }
    }
  }
}
```

### Criar Webhook
```graphql
mutation {
  createWebhook(input: {
    organization_id: "org_id",
    url: "https://sua-url.com/webhook",
    actions: ["card.create", "card.move"],
    headers: {
      "X-Custom-Header": "valor"
    },
    email_notification: true
  }) {
    webhook {
      id
      url
      actions
      headers
      is_active
    }
  }
}
```

### Atualizar Webhook
```graphql
mutation {
  updateWebhook(input: {
    id: "webhook_id",
    url: "https://nova-url.com/webhook",
    actions: ["card.create", "card.done"],
    headers: {
      "X-New-Header": "novo-valor"
    }
  }) {
    webhook {
      id
      url
      actions
      headers
      is_active
    }
  }
}
```

### Deletar Webhook
```graphql
mutation {
  deleteWebhook(input: {
    id: "webhook_id"
  }) {
    success
  }
}
```

## Exemplos

### Exemplo de Webhook Completo
```graphql
mutation {
  createWebhook(input: {
    organization_id: "org_id",
    name: "Notificações de Cards",
    url: "https://api.exemplo.com/webhooks/pipefy",
    actions: [
      "card.create",
      "card.move",
      "card.done",
      "card.expired",
      "card.overdue"
    ],
    headers: {
      "X-API-Key": "chave-secreta",
      "Content-Type": "application/json",
      "Custom-Source": "pipefy"
    },
    email_notification: true,
    send_body: true
  }) {
    webhook {
      id
      name
      url
      actions
      headers
      is_active
      created_at
    }
  }
}
```

### Exemplo de Consulta de Eventos
```graphql
query {
  organization(id: "org_id") {
    webhooks {
      edges {
        node {
          id
          url
          actions
          events(first: 10) {
            edges {
              node {
                id
                action
                status
                created_at
                payload
                response_body
                response_headers
              }
            }
          }
        }
      }
    }
  }
}
```

## Ações Disponíveis

1. **Cards**
   - `card.create`: Criação de card
   - `card.move`: Movimentação entre fases
   - `card.done`: Card concluído
   - `card.expired`: Card expirado
   - `card.overdue`: Card atrasado
   - `card.field_update`: Atualização de campo

2. **Pipes**
   - `pipe.create`: Criação de pipe
   - `pipe.update`: Atualização de pipe
   - `pipe.delete`: Exclusão de pipe

3. **Fases**
   - `phase.create`: Criação de fase
   - `phase.update`: Atualização de fase
   - `phase.delete`: Exclusão de fase

4. **Comentários**
   - `comment.create`: Novo comentário
   - `comment.update`: Edição de comentário
   - `comment.delete`: Exclusão de comentário

## Observações Importantes

1. URLs de webhook devem ser HTTPS
2. Timeouts são definidos em 10 segundos
3. Retentativas ocorrem em caso de falha
4. Headers personalizados são suportados
5. Eventos são entregues em ordem cronológica
6. Payload contém informações detalhadas
7. Logs de eventos são mantidos por 30 dias

## Tipos de Webhooks

Para informações específicas sobre webhooks de Pipes e Tables, consulte:
- [Webhooks de Pipe e Table](./pipe-table-webhooks.md)
