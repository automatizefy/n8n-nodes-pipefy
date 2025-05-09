# Documentação da API de Reports do Pipefy

## Visão Geral
Esta documentação detalha os endpoints relacionados a Reports (Relatórios) na API do Pipefy. Os relatórios permitem extrair e analisar dados dos pipes de forma estruturada e personalizada.

## Índice

1. [Introdução](#introdução)
2. [Autenticação](#autenticação)
3. [Endpoints](#endpoints)
4. [Exemplos](#exemplos)

## Introdução

Reports são ferramentas poderosas que permitem:
- Extrair dados consolidados dos pipes
- Criar visualizações personalizadas
- Acompanhar métricas importantes
- Gerar relatórios periódicos
- Exportar dados em diferentes formatos

## Autenticação

Para acessar a API do Pipefy, é necessário um token de autenticação. Este token deve ser incluído no header da requisição:

```graphql
Authorization: Bearer {seu_token}
```

## Endpoints

### Consultar Relatório
```graphql
query {
  pipeReport(id: "report_id") {
    id
    name
    created_at
    updated_at
    created_by {
      id
      name
    }
    pipe {
      id
      name
    }
  }
}
```

### Criar Relatório
```graphql
mutation {
  createPipeReport(input: {
    pipe_id: "pipe_id",
    name: "Novo Relatório",
    filters: {
      field_id: "field_id",
      operator: "eq",
      value: "valor"
    }
  }) {
    pipe_report {
      id
      name
      created_at
    }
  }
}
```

### Atualizar Relatório
```graphql
mutation {
  updatePipeReport(input: {
    id: "report_id",
    name: "Nome Atualizado",
    filters: {
      field_id: "field_id",
      operator: "gt",
      value: "100"
    }
  }) {
    pipe_report {
      id
      name
      updated_at
    }
  }
}
```

### Deletar Relatório
```graphql
mutation {
  deletePipeReport(input: {
    id: "report_id"
  }) {
    success
  }
}
```

## Exemplos

### Exemplo de Relatório Completo
```graphql
query {
  pipeReport(id: "report_id") {
    id
    name
    created_at
    updated_at
    
    pipe {
      id
      name
      phases {
        name
      }
    }
    
    filters {
      field {
        id
        label
      }
      operator
      value
    }
    
    fields {
      id
      label
      type
    }
    
    grouping {
      field {
        id
        label
      }
      order
    }
    
    sorting {
      field {
        id
        label
      }
      order
    }
    
    created_by {
      id
      name
      email
    }
    
    summary {
      count
      expired_count
      late_count
      finished_count
    }
  }
}
```

### Exemplo de Relatório com Métricas
```graphql
mutation {
  createPipeReport(input: {
    pipe_id: "pipe_id",
    name: "Relatório de Performance",
    filters: [
      {
        field_id: "status",
        operator: "eq",
        value: "Concluído"
      },
      {
        field_id: "due_date",
        operator: "last_month"
      }
    ],
    fields: ["title", "assignee", "due_date", "finished_at"],
    grouping: {
      field_id: "assignee",
      order: "ASC"
    },
    calculations: [
      {
        type: "sum",
        field_id: "valor_projeto"
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
      created_at
    }
  }
}
```

## Observações Importantes

1. Os relatórios podem ser compartilhados com outros usuários
2. É possível agendar a geração automática de relatórios
3. Os filtros suportam operadores lógicos complexos
4. Os dados podem ser exportados em diferentes formatos
5. Alguns campos podem ter restrições de acesso
6. Os relatórios podem incluir dados de campos calculados
7. É possível definir diferentes níveis de acesso aos relatórios
