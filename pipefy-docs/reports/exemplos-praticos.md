# Exemplos Práticos de Uso da API de Reports

## Cenários Comuns

### 1. Relatório de Performance da Equipe
```graphql
mutation {
  createPipeReport(input: {
    pipe_id: "pipe_id",
    name: "Performance por Responsável",
    filters: [
      {
        field_id: "status",
        operator: "in",
        value: ["Concluído", "Cancelado"]
      },
      {
        field_id: "finished_at",
        operator: "last_30_days"
      }
    ],
    fields: [
      "title",
      "assignee",
      "created_at",
      "finished_at",
      "current_phase"
    ],
    grouping: {
      field_id: "assignee",
      order: "ASC"
    },
    calculations: [
      {
        type: "count",
        field_id: "id"
      },
      {
        type: "average",
        field_id: "tempo_conclusao"
      }
    ]
  }) {
    pipe_report {
      id
      name
    }
  }
}
```

### 2. Relatório Financeiro
```graphql
mutation {
  createPipeReport(input: {
    pipe_id: "pipe_id",
    name: "Análise Financeira",
    filters: [
      {
        field_id: "data_pagamento",
        operator: "current_month"
      }
    ],
    fields: [
      "cliente",
      "valor",
      "status_pagamento",
      "data_pagamento"
    ],
    grouping: {
      field_id: "status_pagamento",
      order: "ASC"
    },
    calculations: [
      {
        type: "sum",
        field_id: "valor"
      },
      {
        type: "count",
        field_id: "id"
      }
    ],
    sorting: [
      {
        field_id: "valor",
        order: "DESC"
      }
    ]
  }) {
    pipe_report {
      id
      name
    }
  }
}
```

### 3. Relatório de SLA
```graphql
mutation {
  createPipeReport(input: {
    pipe_id: "pipe_id",
    name: "Análise de SLA",
    filters: [
      {
        field_id: "status",
        operator: "eq",
        value: "Concluído"
      }
    ],
    fields: [
      "title",
      "created_at",
      "due_date",
      "finished_at",
      "tempo_resposta",
      "sla_status"
    ],
    calculations: [
      {
        type: "percentage",
        field_id: "sla_cumprido"
      },
      {
        type: "average",
        field_id: "tempo_resposta"
      }
    ],
    grouping: {
      field_id: "sla_status",
      order: "ASC"
    }
  }) {
    pipe_report {
      id
      name
    }
  }
}
```

### 4. Consultas Avançadas
```graphql
query {
  pipeReport(id: "report_id") {
    # Informações Básicas
    id
    name
    created_at
    
    # Configurações
    filters {
      field {
        id
        label
      }
      operator
      value
    }
    
    # Campos Selecionados
    fields {
      id
      label
      type
    }
    
    # Agrupamento
    grouping {
      field {
        id
        label
      }
      order
    }
    
    # Ordenação
    sorting {
      field {
        id
        label
      }
      order
    }
    
    # Cálculos
    calculations {
      type
      field {
        id
        label
      }
      value
    }
    
    # Resultados
    summary {
      count
      expired_count
      late_count
      on_time_count
    }
    
    # Dados do Pipe
    pipe {
      id
      name
      phases {
        name
        cards_count
      }
    }
  }
}
```

## Operadores de Filtro

### 1. Operadores de Texto
```graphql
filters: [
  {
    field_id: "title",
    operator: "contains",
    value: "Projeto"
  },
  {
    field_id: "description",
    operator: "not_contains",
    value: "Cancelado"
  }
]
```

### 2. Operadores Numéricos
```graphql
filters: [
  {
    field_id: "valor",
    operator: "gt",
    value: "1000"
  },
  {
    field_id: "quantidade",
    operator: "between",
    value: ["10", "50"]
  }
]
```

### 3. Operadores de Data
```graphql
filters: [
  {
    field_id: "created_at",
    operator: "last_30_days"
  },
  {
    field_id: "due_date",
    operator: "between_dates",
    value: ["2025-01-01", "2025-12-31"]
  }
]
```

## Melhores Práticas

### 1. Campos Calculados
```graphql
calculations: [
  {
    type: "sum",
    field_id: "valor_total",
    label: "Total Geral"
  },
  {
    type: "average",
    field_id: "tempo_conclusao",
    label: "Tempo Médio"
  },
  {
    type: "count_distinct",
    field_id: "cliente",
    label: "Total de Clientes"
  }
]
```

### 2. Agrupamentos Múltiplos
```graphql
grouping: [
  {
    field_id: "status",
    order: "ASC"
  },
  {
    field_id: "responsavel",
    order: "ASC"
  }
]
```

## Dicas de Implementação

1. **Planejamento**
   - Defina claramente os objetivos do relatório
   - Identifique os campos necessários
   - Considere o volume de dados

2. **Performance**
   - Use filtros específicos
   - Limite o número de campos
   - Otimize agrupamentos

3. **Visualização**
   - Escolha agrupamentos adequados
   - Defina ordenação clara
   - Use cálculos relevantes

4. **Manutenção**
   - Documente os relatórios
   - Monitore o uso
   - Atualize conforme necessário

5. **Segurança**
   - Controle o acesso
   - Proteja dados sensíveis
   - Gerencie permissões
