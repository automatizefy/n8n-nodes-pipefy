# Documentação de Pipe e Table Webhooks

## Visão Geral
Este guia detalha a configuração e utilização de webhooks específicos para Pipes e Tables no Pipefy. Estes webhooks permitem monitorar eventos específicos relacionados a pipes e tabelas.

## Webhooks de Pipe

### 1. Configurar Webhook para Pipe
```graphql
mutation {
  createPipeWebhook(input: {
    pipe_id: "pipe_id",
    url: "https://sua-url.com/pipe-webhook",
    actions: [
      "card.create",
      "card.move",
      "card.done"
    ],
    headers: {
      "X-Pipe-Key": "chave-secreta",
      "Content-Type": "application/json"
    },
    email_notification: true
  }) {
    webhook {
      id
      url
      actions
      is_active
    }
  }
}
```

### 2. Eventos Específicos de Pipe
```graphql
query {
  pipe(id: "pipe_id") {
    webhooks {
      edges {
        node {
          id
          url
          actions
          events(
            first: 10,
            search: {
              action: "card.move",
              created_at_from: "2025-01-01",
              created_at_to: "2025-12-31"
            }
          ) {
            edges {
              node {
                id
                action
                payload {
                  card {
                    id
                    title
                  }
                  from_phase {
                    name
                  }
                  to_phase {
                    name
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
```

## Webhooks de Table

### 1. Configurar Webhook para Table
```graphql
mutation {
  createTableWebhook(input: {
    table_id: "table_id",
    url: "https://sua-url.com/table-webhook",
    actions: [
      "record.create",
      "record.update",
      "record.delete"
    ],
    headers: {
      "X-Table-Key": "chave-secreta",
      "Content-Type": "application/json"
    },
    email_notification: true
  }) {
    webhook {
      id
      url
      actions
      is_active
    }
  }
}
```

### 2. Eventos Específicos de Table
```graphql
query {
  table(id: "table_id") {
    webhooks {
      edges {
        node {
          id
          url
          actions
          events(
            first: 10,
            search: {
              action: "record.create"
            }
          ) {
            edges {
              node {
                id
                action
                payload {
                  record {
                    id
                    title
                    fields {
                      name
                      value
                    }
                  }
                }
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

### Ações de Pipe
1. **Cards**
   - `card.create`: Criação de card no pipe
   - `card.move`: Movimentação entre fases
   - `card.done`: Card concluído
   - `card.expired`: Card expirado
   - `card.field_update`: Atualização de campo

### Ações de Table
1. **Records**
   - `record.create`: Criação de registro
   - `record.update`: Atualização de registro
   - `record.delete`: Exclusão de registro
   - `record.field_update`: Atualização de campo

## Exemplos de Payloads

### 1. Evento de Card Movido
```json
{
  "action": "card.move",
  "pipe": {
    "id": "pipe_id",
    "name": "Pipeline de Vendas"
  },
  "card": {
    "id": "card_id",
    "title": "Oportunidade XYZ",
    "current_phase": {
      "id": "phase_id",
      "name": "Em Negociação"
    }
  },
  "from_phase": {
    "id": "phase_id_1",
    "name": "Prospecção"
  },
  "to_phase": {
    "id": "phase_id_2",
    "name": "Em Negociação"
  },
  "moved_at": "2025-05-09T10:00:00Z"
}
```

### 2. Evento de Record Criado
```json
{
  "action": "record.create",
  "table": {
    "id": "table_id",
    "name": "Cadastro de Clientes"
  },
  "record": {
    "id": "record_id",
    "title": "Novo Cliente",
    "fields": [
      {
        "name": "Nome",
        "value": "Empresa ABC"
      },
      {
        "name": "Email",
        "value": "contato@abc.com"
      }
    ],
    "created_at": "2025-05-09T10:00:00Z"
  }
}
```

## Melhores Práticas

1. **Configuração**
   - Use URLs HTTPS
   - Configure headers de autenticação
   - Defina ações específicas necessárias
   - Ative notificações por email para falhas

2. **Processamento**
   - Valide a origem do webhook
   - Processe eventos assincronamente
   - Implemente retentativas
   - Mantenha logs detalhados

3. **Monitoramento**
   - Acompanhe eventos em tempo real
   - Monitore taxa de sucesso
   - Configure alertas para falhas
   - Analise padrões de uso

4. **Segurança**
   - Valide payloads
   - Proteja dados sensíveis
   - Use tokens de autenticação
   - Monitore acesso aos endpoints

5. **Manutenção**
   - Atualize URLs quando necessário
   - Revise ações periodicamente
   - Documente configurações
   - Faça backup das configurações
