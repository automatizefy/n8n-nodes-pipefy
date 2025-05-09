# Exemplos Práticos de Uso da API de Phases

## Cenários Comuns

### 1. Criar um Fluxo de Aprovação
```graphql
mutation {
  # Fase de Submissão
  createPhase(input: {
    pipe_id: "pipe_id",
    name: "Submissão",
    description: "Fase inicial para submissão de propostas",
    can_receive_card: true,
    fields: [
      {
        label: "Descrição da Proposta",
        type: "long_text",
        required: true
      },
      {
        label: "Valor",
        type: "currency",
        required: true
      }
    ]
  }) {
    phase { id }
  }

  # Fase de Análise
  createPhase(input: {
    pipe_id: "pipe_id",
    name: "Em Análise",
    description: "Análise da proposta pelos aprovadores",
    fields: [
      {
        label: "Parecer",
        type: "long_text",
        required: true
      },
      {
        label: "Aprovador",
        type: "assignee_select",
        required: true
      }
    ]
  }) {
    phase { id }
  }

  # Fase de Aprovação Final
  createPhase(input: {
    pipe_id: "pipe_id",
    name: "Aprovação Final",
    description: "Decisão final sobre a proposta",
    fields: [
      {
        label: "Decisão",
        type: "select",
        required: true,
        options: [
          { name: "Aprovado" },
          { name: "Reprovado" },
          { name: "Necessita Ajustes" }
        ]
      },
      {
        label: "Comentários",
        type: "long_text"
      }
    ]
  }) {
    phase { id }
  }
}
```

### 2. Gerenciar Cards em uma Fase
```graphql
# Listar Cards de uma Fase
query {
  phase(id: "phase_id") {
    cards(first: 20, search: {
      title: "Proposta",
      due_date_from: "2025-01-01",
      due_date_to: "2025-12-31"
    }) {
      edges {
        node {
          id
          title
          due_date
          assignees {
            user {
              name
            }
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

### 3. Configurar Restrições de Fase
```graphql
mutation {
  updatePhase(input: {
    id: "phase_id",
    can_receive_card: true,
    can_create_card: false,
    only_admin_can_move_to_previous: true,
    only_admin_can_move_to_next: true
  }) {
    phase {
      id
      name
      can_receive_card
      can_create_card
    }
  }
}
```

### 4. Reordenar Fases
```graphql
mutation {
  updatePipePhases(input: {
    pipe_id: "pipe_id",
    phase_order: ["phase_id1", "phase_id2", "phase_id3"]
  }) {
    phases {
      id
      name
    }
  }
}
```

### 5. Consultas Avançadas
```graphql
query {
  phase(id: "phase_id") {
    # Informações Básicas
    id
    name
    description
    
    # Métricas
    cards_count
    expired_cards_count
    late_cards_count
    done
    
    # Cards com Filtros
    cards(
      first: 10,
      search: {
        overdue: true,
        assignee_ids: ["user_id"]
      },
      sort_by: "due_date",
      sort_order: "ASC"
    ) {
      edges {
        node {
          id
          title
          due_date
          late
          expired
        }
      }
    }
    
    # Campos da Fase
    fields {
      id
      label
      type
      required
      help
    }
    
    # Informações do Pipe
    pipe {
      id
      name
      phases_count
    }
  }
}
```

## Melhores Práticas

### 1. Criação de Fases com Validações
```graphql
mutation {
  createPhase(input: {
    pipe_id: "pipe_id",
    name: "Validação de Documentos",
    description: "Fase para validação de documentos obrigatórios",
    fields: [
      {
        label: "CPF/CNPJ",
        type: "cnpj",
        required: true,
        help: "Insira um documento válido"
      },
      {
        label: "Comprovante de Endereço",
        type: "attachment",
        required: true,
        help: "Anexe um comprovante recente"
      },
      {
        label: "Status da Validação",
        type: "select",
        required: true,
        options: [
          { name: "Pendente de Análise" },
          { name: "Em Análise" },
          { name: "Documentos Válidos" },
          { name: "Necessita Correção" }
        ]
      }
    ]
  }) {
    phase {
      id
      name
      fields {
        id
        label
        type
      }
    }
  }
}
```

### 2. Automações e Condições
```graphql
mutation {
  createPhaseCondition(input: {
    phase_id: "phase_id",
    field_id: "field_id",
    operator: "eq",
    value: "Aprovado",
    action: "move_to_next"
  }) {
    phase_condition {
      id
      field {
        label
      }
      operator
      value
    }
  }
}
```

## Dicas de Implementação

1. **Planejamento de Fases**
   - Defina claramente o propósito de cada fase
   - Considere os campos necessários
   - Planeje as transições entre fases

2. **Validações**
   - Configure campos obrigatórios adequadamente
   - Implemente validações de documentos
   - Defina regras de transição claras

3. **Performance**
   - Use paginação para listar cards
   - Filtre dados desnecessários nas consultas
   - Considere o impacto de automações

4. **Segurança**
   - Controle permissões por fase
   - Restrinja movimentações quando necessário
   - Mantenha logs de alterações

5. **Manutenção**
   - Documente as customizações
   - Monitore o desempenho das fases
   - Faça backup antes de alterações significativas
