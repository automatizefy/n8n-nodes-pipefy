# Manipulação de Campos em Cards

## Visão Geral
Os cards no Pipefy podem conter diversos tipos de campos, cada um com suas próprias regras de validação e formatos específicos. Este guia detalha como manipular corretamente cada tipo de campo.

## Estrutura Básica

```graphql
fields_attributes: [
  {
    field_id: "id_do_campo",
    value: "valor_do_campo"
  }
]
```

## Tipos de Campos e Seus Formatos

### 1. Campos de Texto
```graphql
# Texto Curto
{
  field_id: "campo_nome",
  value: "João Silva"
}

# Texto Longo
{
  field_id: "campo_descricao",
  value: "Descrição detalhada\ncom múltiplas linhas"
}
```

### 2. Campos Numéricos
```graphql
# Número Inteiro
{
  field_id: "campo_quantidade",
  value: "42"  // Note que mesmo números são enviados como string
}

# Número Decimal
{
  field_id: "campo_valor",
  value: "42.99"
}

# Moeda
{
  field_id: "campo_preco",
  value: "1250.00"
}
```

### 3. Data e Hora
```graphql
# Data
{
  field_id: "campo_data",
  value: "2025-05-09"  // Formato YYYY-MM-DD
}

# Data e Hora
{
  field_id: "campo_datetime",
  value: "2025-05-09T15:30:00Z"  // Formato ISO 8601
}
```

### 4. Campos de Seleção
```graphql
# Seleção Única
{
  field_id: "campo_status",
  value: "opcao_1"  // ID ou valor da opção
}

# Múltipla Escolha
{
  field_id: "campo_categorias",
  value: ["opcao_1", "opcao_2"]  // Array de IDs ou valores
}
```

### 5. Campos de Relação
```graphql
# Conexão com Outro Card
{
  field_id: "campo_relacionado",
  value: "card_id_relacionado"
}

# Múltiplas Conexões
{
  field_id: "campo_relacionados",
  value: ["card_id_1", "card_id_2"]
}
```

## Validações e Regras

### 1. Campos Obrigatórios
```graphql
mutation {
  createCard(input: {
    pipe_id: "pipe_id",
    fields_attributes: [
      {
        field_id: "campo_obrigatorio",
        value: "valor"  // Não pode ser vazio ou nulo
      }
    ]
  }) {
    card {
      id
    }
  }
}
```

### 2. Validações de Formato

#### Exemplo com Múltiplas Validações
```graphql
mutation {
  createCard(input: {
    pipe_id: "pipe_id",
    fields_attributes: [
      {
        field_id: "campo_email",
        value: "email@exemplo.com"  // Deve ser email válido
      },
      {
        field_id: "campo_telefone",
        value: "+55 11 99999-9999"  // Deve seguir formato de telefone
      },
      {
        field_id: "campo_cpf",
        value: "123.456.789-00"  // Deve ser CPF válido
      }
    ]
  }) {
    card {
      id
      fields {
        field {
          id
          label
        }
        value
        validation_errors
      }
    }
  }
}
```

## Cenários Especiais

### 1. Campos Condicionais
```graphql
mutation {
  updateCard(input: {
    id: "card_id",
    fields_attributes: [
      {
        field_id: "campo_tipo",
        value: "pessoa_juridica"
      },
      {
        field_id: "campo_cnpj",  // Campo que só aparece se tipo = pessoa_juridica
        value: "12.345.678/0001-90"
      }
    ]
  }) {
    card {
      fields {
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

### 2. Campos com Fórmulas
```graphql
# As fórmulas são calculadas automaticamente pelo Pipefy
query {
  card(id: "card_id") {
    fields {
      field {
        id
        label
        type
      }
      value
      calculated_value  # Para campos com fórmulas
    }
  }
}
```

## Tratamento de Erros

### Exemplos de Erros Comuns

```json
{
  "errors": [
    {
      "message": "Campo obrigatório não preenchido",
      "locations": [{"line": 2, "column": 3}],
      "path": ["createCard"],
      "extensions": {
        "field_id": "campo_obrigatorio",
        "code": "REQUIRED_FIELD"
      }
    },
    {
      "message": "Valor inválido para o campo",
      "locations": [{"line": 2, "column": 3}],
      "path": ["createCard"],
      "extensions": {
        "field_id": "campo_email",
        "code": "INVALID_FORMAT"
      }
    }
  ]
}
```

## Melhores Práticas

1. **Validação Prévia**
   - Valide os dados antes de enviar
   - Verifique os formatos requeridos
   - Considere campos obrigatórios

2. **Campos Calculados**
   - Não tente atualizar campos calculados
   - Use `calculated_value` para leitura
   - Considere dependências entre campos

3. **Performance**
   - Atualize apenas campos necessários
   - Agrupe atualizações quando possível
   - Considere o impacto em automações

4. **Campos Customizados**
   - Documente campos personalizados
   - Mantenha consistência nos valores
   - Considere impacto em integrações
