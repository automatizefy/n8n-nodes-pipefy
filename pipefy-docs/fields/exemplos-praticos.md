# Exemplos Práticos de Uso da API de Fields

## Cenários Comuns

### 1. Criar Campos para um Novo Pipe
```graphql
mutation {
  # Campo de Título do Projeto
  createPipeField(input: {
    pipe_id: "pipe_id",
    label: "Título do Projeto",
    type: "short_text",
    required: true,
    help: "Digite o nome do projeto"
  }) {
    field { id }
  }

  # Campo de Descrição
  createPipeField(input: {
    pipe_id: "pipe_id",
    label: "Descrição",
    type: "long_text",
    required: false
  }) {
    field { id }
  }

  # Campo de Data de Entrega
  createPipeField(input: {
    pipe_id: "pipe_id",
    label: "Data de Entrega",
    type: "date",
    required: true
  }) {
    field { id }
  }
}
```

### 2. Campos com Opções Dinâmicas
```graphql
mutation {
  createPipeField(input: {
    pipe_id: "pipe_id",
    label: "Responsável",
    type: "assignee_select",
    can_connect_multiple: true,
    required: true,
    help: "Selecione os responsáveis pelo projeto"
  }) {
    field {
      id
      label
      type
      can_connect_multiple
    }
  }
}
```

### 3. Campos Condicionais Complexos
```graphql
mutation {
  # Campo Principal
  createPipeField(input: {
    pipe_id: "pipe_id",
    label: "Tipo de Projeto",
    type: "select",
    options: [
      { id: "1", name: "Desenvolvimento" },
      { id: "2", name: "Design" },
      { id: "3", name: "Marketing" }
    ]
  }) {
    field { id }
  }

  # Campo Condicional para Desenvolvimento
  createPipeField(input: {
    pipe_id: "pipe_id",
    label: "Linguagem de Programação",
    type: "select",
    options: [
      { id: "1", name: "JavaScript" },
      { id: "2", name: "Python" },
      { id: "3", name: "Java" }
    ],
    conditional: {
      field_id: "tipo_projeto",
      field_value: "Desenvolvimento"
    }
  }) {
    field { id }
  }

  # Campo Condicional para Design
  createPipeField(input: {
    pipe_id: "pipe_id",
    label: "Formato de Entrega",
    type: "select",
    options: [
      { id: "1", name: "PSD" },
      { id: "2", name: "AI" },
      { id: "3", name: "Figma" }
    ],
    conditional: {
      field_id: "tipo_projeto",
      field_value: "Design"
    }
  }) {
    field { id }
  }
}
```

### 4. Campos com Validações Avançadas
```graphql
mutation {
  # Campo de Email com Validação
  createPipeField(input: {
    pipe_id: "pipe_id",
    label: "Email do Cliente",
    type: "email",
    required: true,
    help: "Digite um email válido",
    minimal_length: 5,
    maximal_length: 100
  }) {
    field { id }
  }

  # Campo Numérico com Range
  createPipeField(input: {
    pipe_id: "pipe_id",
    label: "Orçamento",
    type: "currency",
    required: true,
    minimal_value: "1000",
    maximal_value: "100000",
    help: "Valor entre R$ 1.000 e R$ 100.000"
  }) {
    field { id }
  }

  # Campo de Telefone com Máscara
  createPipeField(input: {
    pipe_id: "pipe_id",
    label: "Telefone",
    type: "phone",
    required: true,
    pattern: "+55 (##) #####-####"
  }) {
    field { id }
  }
}
```

### 5. Campos de Conexão
```graphql
mutation {
  createPipeField(input: {
    pipe_id: "pipe_id",
    label: "Projetos Relacionados",
    type: "connection",
    can_connect_multiple: true,
    source_pipe_id: "outro_pipe_id",
    connection_conditions: [
      {
        field_id: "status",
        operator: "eq",
        value: "Ativo"
      }
    ]
  }) {
    field {
      id
      label
      type
      can_connect_multiple
    }
  }
}
```

## Buscando Campos

### 1. Listar Campos de um Pipe
```graphql
query {
  pipe(id: "pipe_id") {
    fields {
      edges {
        node {
          id
          label
          type
          description
          required
          help
          created_at
          updated_at
        }
      }
    }
  }
}
```

### 2. Buscar Campo Específico com Detalhes
```graphql
query {
  field(id: "field_id") {
    id
    label
    type
    description
    required
    help
    minimal_value
    maximal_value
    minimal_length
    maximal_length
    options {
      id
      name
    }
    conditional {
      field {
        id
        label
      }
      value
    }
    phase {
      id
      name
    }
  }
}
```

## Melhores Práticas

### 1. Validação de Campos
```graphql
# Exemplo de campo com várias validações
mutation {
  createPipeField(input: {
    pipe_id: "pipe_id",
    label: "Nome do Documento",
    type: "short_text",
    required: true,
    minimal_length: 3,
    maximal_length: 50,
    regex_pattern: "^[A-Za-z0-9_-]*$",
    help: "Use apenas letras, números, hífen e underscore"
  }) {
    field {
      id
      label
      validation_rules {
        minimal_length
        maximal_length
        regex_pattern
      }
    }
  }
}
```

### 2. Campos Calculados
```graphql
mutation {
  createPipeField(input: {
    pipe_id: "pipe_id",
    label: "Total",
    type: "formula",
    formula: "{quantidade} * {valor_unitario}",
    decimal_places: 2
  }) {
    field {
      id
      label
      type
      formula
    }
  }
}
```

## Dicas

1. **Planejamento**
   - Defina claramente o propósito de cada campo
   - Considere as dependências entre campos
   - Planeje a ordem de criação dos campos

2. **Validações**
   - Use validações apropriadas para cada tipo de dado
   - Forneça mensagens de ajuda claras
   - Considere o impacto nas automações

3. **Manutenção**
   - Documente as customizações
   - Monitore o uso dos campos
   - Faça backup antes de alterações significativas

4. **Performance**
   - Evite campos desnecessários
   - Use campos calculados com moderação
   - Considere o impacto em relatórios
