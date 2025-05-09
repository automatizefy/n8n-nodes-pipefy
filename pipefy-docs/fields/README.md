# Documentação da API de Fields do Pipefy

## Visão Geral
Esta documentação detalha os endpoints relacionados a Fields (Campos) na API do Pipefy. Fields são os elementos que definem a estrutura de dados dos cards em um pipe.

## Índice

1. [Introdução](#introdução)
2. [Autenticação](#autenticação)
3. [Endpoints](#endpoints)
4. [Exemplos](#exemplos)

## Introdução

Fields são os componentes fundamentais que definem como os dados são estruturados e validados no Pipefy. Cada field pode ter:
- Tipo específico (texto, número, data, etc.)
- Regras de validação
- Condições de visibilidade
- Propriedades customizadas
- Opções predefinidas

## Autenticação

Para acessar a API do Pipefy, é necessário um token de autenticação. Este token deve ser incluído no header da requisição:

```graphql
Authorization: Bearer {seu_token}
```

## Endpoints

### Consultar Campo
```graphql
query {
  field(id: "field_id") {
    id
    label
    type
    description
    options {
      id
      name
    }
    phase {
      name
    }
  }
}
```

### Criar Campo
```graphql
mutation {
  createPipeField(input: {
    pipe_id: "pipe_id",
    label: "Nome do Campo",
    type: "short_text",
    description: "Descrição do campo",
    required: true
  }) {
    field {
      id
      label
      type
    }
  }
}
```

### Atualizar Campo
```graphql
mutation {
  updateField(input: {
    id: "field_id",
    label: "Novo Nome",
    description: "Nova descrição",
    help: "Texto de ajuda atualizado"
  }) {
    field {
      id
      label
      description
      help
    }
  }
}
```

### Deletar Campo
```graphql
mutation {
  deleteField(input: {
    id: "field_id"
  }) {
    success
  }
}
```

## Exemplos

### Exemplo de Campo com Opções
```graphql
mutation {
  createPipeField(input: {
    pipe_id: "pipe_id",
    label: "Status do Projeto",
    type: "select",
    options: [
      { id: "1", name: "Em Análise" },
      { id: "2", name: "Em Desenvolvimento" },
      { id: "3", name: "Em Teste" },
      { id: "4", name: "Concluído" }
    ],
    required: true,
    help: "Selecione o status atual do projeto"
  }) {
    field {
      id
      label
      type
      options {
        id
        name
      }
    }
  }
}
```

### Exemplo de Campo Condicional
```graphql
mutation {
  createPipeField(input: {
    pipe_id: "pipe_id",
    label: "CNPJ",
    type: "cnpj",
    required: true,
    conditional: {
      field_id: "tipo_pessoa",
      field_value: "juridica"
    }
  }) {
    field {
      id
      label
      type
      conditional {
        field {
          id
          label
        }
        value
      }
    }
  }
}
```

### Exemplo de Campo com Validações
```graphql
mutation {
  createPipeField(input: {
    pipe_id: "pipe_id",
    label: "Valor do Projeto",
    type: "currency",
    required: true,
    minimal_value: "1000",
    maximal_value: "1000000",
    help: "Valor entre R$ 1.000 e R$ 1.000.000"
  }) {
    field {
      id
      label
      type
      minimal_value
      maximal_value
    }
  }
}
```

## Observações Importantes

1. Cada tipo de campo tem suas próprias propriedades e validações
2. Campos podem ter dependências com outros campos
3. Alguns tipos de campos não podem ser modificados após a criação
4. A exclusão de campos pode afetar cards existentes
5. Campos podem ser usados em automações e relatórios
6. Considere o impacto em integrações ao modificar campos
7. Mantenha documentação atualizada das customizações
