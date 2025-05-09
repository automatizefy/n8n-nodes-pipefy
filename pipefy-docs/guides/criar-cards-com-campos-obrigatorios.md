# Guia: Criar Cards com Campos Obrigatórios

## Visão Geral
Este guia explica como criar cards no Pipefy garantindo que todos os campos obrigatórios sejam preenchidos corretamente.

## Passo a Passo

### 1. Verificar Campos Obrigatórios
Primeiro, consulte os campos obrigatórios do pipe:

```graphql
query {
  pipe(id: "pipe_id") {
    start_form_fields {
      id
      label
      type
      required
      help
    }
  }
}
```

### 2. Criar Card com Campos Obrigatórios
```graphql
mutation {
  createCard(input: {
    pipe_id: "pipe_id",
    # Campos básicos
    title: "Novo Projeto",
    due_date: "2025-12-31",
    
    # Campos personalizados obrigatórios
    fields_attributes: [
      {
        field_id: "nome_cliente",
        value: "Cliente XYZ"
      },
      {
        field_id: "email_contato",
        value: "contato@clientexyz.com"
      },
      {
        field_id: "valor_projeto",
        value: "50000.00"
      },
      {
        field_id: "prioridade",
        value: "Alta"
      }
    ],
    
    # Responsáveis
    assignee_ids: ["user_id1", "user_id2"]
  }) {
    card {
      id
      title
      due_date
      current_phase {
        name
      }
      fields {
        name
        value
      }
      assignees {
        user {
          name
        }
      }
    }
  }
}
```

### 3. Exemplo com Diferentes Tipos de Campos
```graphql
mutation {
  createCard(input: {
    pipe_id: "pipe_id",
    title: "Novo Pedido",
    fields_attributes: [
      # Campo de texto
      {
        field_id: "descricao",
        value: "Descrição detalhada do pedido"
      },
      
      # Campo de data
      {
        field_id: "data_entrega",
        value: "2025-12-31"
      },
      
      # Campo numérico
      {
        field_id: "quantidade",
        value: "10"
      },
      
      # Campo de seleção
      {
        field_id: "categoria",
        value: "produto_fisico"
      },
      
      # Campo de múltipla escolha
      {
        field_id: "opcoes_entrega",
        value: ["expressa", "segurada"]
      },
      
      # Campo de anexo
      {
        field_id: "documentos",
        attachments: [
          {
            url: "https://exemplo.com/doc1.pdf",
            filename: "contrato.pdf"
          }
        ]
      }
    ]
  }) {
    card {
      id
      title
      fields {
        field {
          id
          label
        }
        value
        array_value
        datetime_value
      }
    }
  }
}
```

### 4. Tratamento de Erros
```graphql
mutation {
  createCard(input: {
    pipe_id: "pipe_id",
    title: "Novo Card",
    fields_attributes: [
      {
        field_id: "campo_obrigatorio",
        value: ""  # Valor inválido para teste
      }
    ]
  }) {
    card {
      id
      title
    }
    errors {
      field_id
      message
      type
    }
  }
}
```

## Validações Importantes

### 1. Campos de Texto
- Respeite limites mínimos e máximos de caracteres
- Formate corretamente emails, telefones, etc.
- Use máscaras quando necessário

### 2. Campos Numéricos
- Utilize o formato correto (inteiro/decimal)
- Observe valores mínimos e máximos
- Use a formatação correta para moeda

### 3. Campos de Data
- Use o formato ISO 8601 (YYYY-MM-DD)
- Valide datas futuras/passadas
- Considere o fuso horário

### 4. Campos de Seleção
- Verifique se os valores são válidos
- Use IDs ou valores exatos das opções
- Respeite seleção única/múltipla

## Melhores Práticas

1. **Validação Prévia**
   ```javascript
   // Exemplo de validação
   const validateField = (value, field) => {
     if (field.required && !value) {
       throw new Error(`Campo ${field.label} é obrigatório`);
     }
     
     if (field.type === 'email' && !isValidEmail(value)) {
       throw new Error(`Email inválido`);
     }
     
     // Outras validações...
   };
   ```

2. **Estrutura de Dados**
   ```javascript
   // Exemplo de organização
   const cardData = {
     title: "Novo Card",
     fields_attributes: requiredFields.map(field => ({
       field_id: field.id,
       value: getFieldValue(field)
     }))
   };
   ```

3. **Tratamento de Erros**
   ```javascript
   // Exemplo de tratamento
   try {
     const result = await createCard(cardData);
     if (result.errors) {
       handleErrors(result.errors);
     }
   } catch (error) {
     handleApiError(error);
   }
   ```

## Observações Importantes

1. Sempre valide os dados antes de enviar
2. Mantenha consistência nos formatos
3. Documente campos personalizados
4. Implemente tratamento de erros
5. Considere validações customizadas
6. Mantenha logs de criação
7. Faça backup dos dados importantes
