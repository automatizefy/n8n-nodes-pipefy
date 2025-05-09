# Padrões do Sistema

## Arquitetura
O nó segue a arquitetura padrão de nós do n8n:
1. **Classe Principal**: `Pipefy` implementando `INodeType`
2. **Descrição do Nó**: Configuração via `INodeTypeDescription`
3. **Execução**: Método `execute` para processamento das operações
4. **Webhooks**: Método `webhook` para processamento de webhooks

## Decisões Técnicas Principais
1. **GraphQL**: Todas as operações são realizadas via GraphQL
2. **Tipos de Campo**: Suporte para todos os tipos de campo do Pipefy
3. **Validação**: Validação de dados antes do envio
4. **Tratamento de Erros**: Tratamento consistente de erros

## Padrões de Design
### Recursos
- Cada recurso (Card, Pipe, Phase, etc.) tem suas próprias operações
- Operações CRUD consistentes em todos os recursos
- Campos personalizados seguem o mesmo padrão em todos os recursos

### Campos
```typescript
interface Field {
  label: string;
  type: string;
  required: boolean;
  help?: string;
  description?: string;
}
```

### Tipos de Campo Suportados
- Assignee
- Attachment
- Checklist
- Cnpj
- Connection
- Currency
- Date
- DateTime
- Due Date
- Email
- ID
- Label
- Long Text
- Number
- Phone
- Radio
- Select
- Short Text
- Statement
- Time

## Relacionamentos entre Componentes
1. **Cards → Pipes**: Cards pertencem a um Pipe
2. **Cards → Phases**: Cards estão em uma Phase
3. **Phases → Pipes**: Phases pertencem a um Pipe
4. **Tables → Organizations**: Tables pertencem a uma Organization
5. **Users → Organizations**: Users pertencem a uma Organization

## Padrões de Implementação
### Queries GraphQL
```graphql
query {
  resource(id: $id) {
    id
    name
    // campos específicos do recurso
  }
}
```

### Mutations GraphQL
```graphql
mutation {
  operation(input: {
    // parâmetros da operação
  }) {
    resource {
      // campos retornados
    }
  }
}
```

### Tratamento de Erros
```typescript
try {
  // operação
} catch (error) {
  if (this.continueOnFail()) {
    returnData.push({ json: { error: errorMessage } });
    continue;
  }
  throw error;
}
```

## Convenções de Código
1. **Nomes de Variáveis**: camelCase
2. **Nomes de Classes**: PascalCase
3. **Constantes**: UPPER_CASE
4. **Interfaces**: Prefixo 'I'
5. **Tipos**: Sufixo 'Type' 