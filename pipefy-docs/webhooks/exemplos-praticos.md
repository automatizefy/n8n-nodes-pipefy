# Exemplos Práticos de Uso da API de Webhooks

## Cenários Comuns

### 1. Configurar Webhook para Monitoramento de Cards
```graphql
mutation {
  createWebhook(input: {
    organization_id: "org_id",
    name: "Monitoramento de Cards",
    url: "https://api.empresa.com/pipefy/cards",
    actions: [
      "card.create",
      "card.move",
      "card.done",
      "card.expired",
      "card.field_update"
    ],
    headers: {
      "X-API-Key": "chave-secreta",
      "Content-Type": "application/json"
    },
    email_notification: true,
    send_body: true
  }) {
    webhook {
      id
      name
      url
      actions
      is_active
    }
  }
}
```

### 2. Integração com Sistema Externo
```graphql
# Criar Webhook para Integração
mutation {
  createWebhook(input: {
    organization_id: "org_id",
    name: "Integração ERP",
    url: "https://erp.empresa.com/api/pipefy",
    actions: [
      "card.create",
      "card.field_update"
    ],
    headers: {
      "Authorization": "Bearer token-erp",
      "X-System": "ERP-Integration",
      "X-Version": "1.0"
    },
    # Configurações adicionais
    email_notification: true,
    send_body: true,
    include_member_email: true,
    include_member_name: true
  }) {
    webhook {
      id
      name
      url
      actions
      headers
    }
  }
}

# Monitorar Eventos
query {
  organization(id: "org_id") {
    webhook(id: "webhook_id") {
      events(
        first: 10,
        search: {
          status: "failed",
          created_at_from: "2025-01-01",
          created_at_to: "2025-12-31"
        }
      ) {
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
```

### 3. Notificações para Equipe
```graphql
mutation {
  createWebhook(input: {
    organization_id: "org_id",
    name: "Notificações da Equipe",
    url: "https://slack.webhook.url/pipefy",
    actions: [
      "card.expired",
      "card.overdue",
      "card.late",
      "comment.create"
    ],
    headers: {
      "X-Slack-Channel": "#projetos",
      "X-Priority": "high"
    },
    email_notification: true
  }) {
    webhook {
      id
      name
      url
      actions
    }
  }
}
```

### 4. Gestão de Webhooks
```graphql
# Listar Todos os Webhooks
query {
  organization(id: "org_id") {
    webhooks {
      edges {
        node {
          id
          name
          url
          actions
          is_active
          created_at
          updated_at
          events_count
          last_event {
            status
            created_at
          }
        }
      }
    }
  }
}

# Atualizar Webhook Existente
mutation {
  updateWebhook(input: {
    id: "webhook_id",
    actions: [
      "card.create",
      "card.move",
      "card.done"
    ],
    headers: {
      "X-API-Version": "2.0",
      "X-Custom-Header": "novo-valor"
    },
    is_active: true
  }) {
    webhook {
      id
      actions
      headers
      is_active
      updated_at
    }
  }
}
```

## Melhores Práticas

### 1. Estrutura do Endpoint
```javascript
// Exemplo de endpoint para receber webhooks
app.post('/webhooks/pipefy', (req, res) => {
  try {
    const { action, data } = req.body;
    
    // Validar assinatura do webhook
    const signature = req.headers['x-pipefy-signature'];
    if (!validateSignature(signature, req.body)) {
      return res.status(401).send('Assinatura inválida');
    }
    
    // Processar evento
    switch (action) {
      case 'card.create':
        handleCardCreated(data);
        break;
      case 'card.move':
        handleCardMoved(data);
        break;
      // ...outros casos
    }
    
    // Responder rapidamente
    res.status(200).send('OK');
    
  } catch (error) {
    console.error('Erro no webhook:', error);
    res.status(500).send('Erro interno');
  }
});
```

### 2. Validação de Eventos
```javascript
// Validar payload do webhook
const validateWebhookPayload = (payload) => {
  const requiredFields = ['action', 'data', 'organization_id'];
  
  for (const field of requiredFields) {
    if (!payload[field]) {
      throw new Error(`Campo obrigatório ausente: ${field}`);
    }
  }
  
  // Validações específicas por tipo de evento
  if (payload.action === 'card.field_update') {
    validateFieldUpdate(payload.data);
  }
};
```

## Dicas de Implementação

1. **Segurança**
   - Use HTTPS para endpoints
   - Valide assinaturas
   - Proteja dados sensíveis
   - Monitore tentativas de acesso

2. **Performance**
   - Responda rapidamente
   - Processe eventos assincronamente
   - Implemente filas se necessário
   - Monitore tempos de resposta

3. **Resiliência**
   - Implemente retentativas
   - Mantenha logs detalhados
   - Monitore falhas
   - Use circuit breakers

4. **Manutenção**
   - Monitore eventos regularmente
   - Documente configurações
   - Mantenha headers atualizados
   - Faça backup das configurações

5. **Monitoramento**
   - Implemente alertas
   - Monitore taxa de sucesso
   - Acompanhe volume de eventos
   - Analise padrões de uso
