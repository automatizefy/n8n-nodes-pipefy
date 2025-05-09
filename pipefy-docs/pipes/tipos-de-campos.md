# Tipos de Campos Disponíveis no Pipefy

## Visão Geral
O Pipefy oferece diversos tipos de campos que podem ser utilizados em pipes. Cada tipo tem suas próprias características e casos de uso específicos.

## Tipos Básicos

### 1. Texto
- **short_text**: Campo de texto curto
- **long_text**: Campo de texto longo/área de texto
```graphql
{
  type: "short_text",
  label: "Nome do Cliente"
}
```

### 2. Números
- **number**: Número inteiro ou decimal
- **currency**: Valor monetário
```graphql
{
  type: "number",
  label: "Quantidade",
  minimal_value: 0,
  maximal_value: 100
}
```

### 3. Data e Hora
- **date**: Campo de data
- **datetime**: Campo de data e hora
```graphql
{
  type: "datetime",
  label: "Data de Entrega"
}
```

## Tipos de Seleção

### 1. Seleção Única
- **select**: Lista suspensa com opções únicas
```graphql
{
  type: "select",
  label: "Status",
  options: [
    { id: "1", name: "Pendente" },
    { id: "2", name: "Em Andamento" },
    { id: "3", name: "Concluído" }
  ]
}
```

### 2. Seleção Múltipla
- **checkbox**: Múltipla escolha
- **radio**: Escolha única com botões de rádio
```graphql
{
  type: "checkbox",
  label: "Categorias",
  options: [
    { id: "1", name: "Urgente" },
    { id: "2", name: "Importante" },
    { id: "3", name: "Pode Esperar" }
  ]
}
```

## Tipos Especiais

### 1. Anexos e Mídia
- **attachment**: Campo para upload de arquivos
- **image**: Campo específico para imagens
```graphql
{
  type: "attachment",
  label: "Documentos",
  maximal_size: 10000000 // 10MB em bytes
}
```

### 2. Relacionamentos
- **connection**: Conexão com outros cards
- **assignee_select**: Campo para atribuição de usuários
```graphql
{
  type: "connection",
  label: "Relacionado a",
  source_pipe_id: "pipe_id"
}
```

### 3. Campos Calculados
- **formula**: Campo com valor calculado
- **id**: Identificador único automático
```graphql
{
  type: "formula",
  label: "Valor Total",
  formula: "{campo_quantidade} * {campo_valor_unitario}"
}
```

## Características Comuns

Todos os tipos de campos podem incluir as seguintes propriedades:

```graphql
{
  label: "Nome do Campo",
  help: "Texto de ajuda para o campo",
  required: true,
  editable: true,
  visible: true,
  description: "Descrição detalhada do campo"
}
```

## Criando Campos via API

### Exemplo Completo
```graphql
mutation {
  createPipeField(input: {
    pipe_id: "pipe_id",
    type: "select",
    label: "Status do Projeto",
    help: "Selecione o status atual do projeto",
    required: true,
    options: [
      { id: "1", name: "Planejamento" },
      { id: "2", name: "Em Desenvolvimento" },
      { id: "3", name: "Em Teste" },
      { id: "4", name: "Concluído" }
    ]
  }) {
    field {
      id
      type
      label
      required
      options {
        id
        name
      }
    }
  }
}
```

## Validações

Cada tipo de campo possui suas próprias validações:

1. **Texto**
   - `minimal_length`: Comprimento mínimo
   - `maximal_length`: Comprimento máximo

2. **Número**
   - `minimal_value`: Valor mínimo
   - `maximal_value`: Valor máximo
   - `decimal_places`: Casas decimais

3. **Anexos**
   - `maximal_size`: Tamanho máximo em bytes
   - `allowed_extensions`: Extensões permitidas

## Observações Importantes

1. Nem todos os campos podem ser editados após a criação
2. Alguns tipos de campos podem exigir configurações adicionais
3. Campos calculados dependem de outros campos existentes
4. Campos de conexão precisam de um pipe de origem válido
5. O tipo do campo não pode ser alterado após a criação
