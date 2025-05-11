# Estrutura do Nó Pipefy para n8n

## Visão Geral

Este nó implementa integração com a API GraphQL do Pipefy, permitindo realizar operações nos principais recursos da plataforma.

## Recursos e Operações

O nó suporta os seguintes recursos e operações:

### Pipes
- **get**: Consultar detalhes de um pipe
- **create**: Criar um novo pipe
- **update**: Atualizar um pipe existente
- **delete**: Excluir um pipe

### Cards
- **get**: Consultar detalhes de um card
- **create**: Criar um novo card
- **update**: Atualizar dados de um card
- **move**: Mover um card para outra fase
- **delete**: Excluir um card

### Webhooks
- **list**: Listar webhooks de uma organização
- **create**: Criar um novo webhook
- **update**: Atualizar um webhook existente
- **delete**: Excluir um webhook

### Organizações
- **get**: Consultar detalhes de uma organização
- **list**: Listar organizações do usuário

## Estrutura de Arquivos

Implementação seguindo o padrão de organização do n8n:

```
n8n-nodes-pipefy/
├── credentials/               # Credenciais para autenticação
│   └── Pipefy.credentials.ts  # Definição de credenciais (API Token)
├── nodes/
│   └── Pipefy/                # Nó do Pipefy
│       ├── execute/           # Implementação das operações
│       │   ├── card/          # Operações de cards
│       │   ├── organization/  # Operações de organizações
│       │   ├── pipe/          # Operações de pipes
│       │   ├── webhook/       # Operações de webhooks
│       │   └── index.ts       # Exportação das funções de operação
│       ├── properties/        # Definição das propriedades/parâmetros do nó
│       │   ├── card.operations.ts
│       │   ├── organization.operations.ts
│       │   ├── pipe.operations.ts
│       │   ├── webhook.operations.ts
│       │   └── index.ts       # Exportação das propriedades
│       ├── Pipefy.node.json   # Metadados do nó
│       ├── Pipefy.node.ts     # Classe principal do nó
│       ├── PipefyApi.ts       # Cliente da API GraphQL do Pipefy
│       └── pipefy.svg         # Ícone do nó
└── package.json               # Configuração do pacote
```

## Implementação

### Classes Principais

1. **Pipefy** (`Pipefy.node.ts`): Classe principal do nó que implementa a interface INodeType.
   - Define metadados do nó (nome, descrição, propriedades)
   - Implementa o método `execute()` para executar operações

2. **PipefyAPI** (`PipefyApi.ts`): Cliente para comunicação com a API GraphQL do Pipefy.
   - Implementa métodos para cada operação (consultar, criar, atualizar, excluir)
   - Centraliza a lógica de comunicação com a API

### Fluxo de Execução

1. O usuário seleciona um recurso (pipe, card, webhook, organização)
2. O usuário seleciona uma operação para o recurso (get, create, update, etc.)
3. O usuário preenche os parâmetros necessários
4. A função `execute()` do nó é chamada
5. A função identifica o recurso e operação selecionados
6. A função de implementação correspondente é chamada
7. A requisição GraphQL é montada e enviada para a API do Pipefy
8. O resultado é retornado para o fluxo do n8n

## Desenvolvimento

### Adicionando Novos Recursos

Para adicionar um novo recurso:

1. Criar um arquivo de operações em `properties/` (exemplo: `newresource.operations.ts`)
2. Adicionar o recurso e suas operações à lista em `properties/index.ts`
3. Criar uma pasta para o recurso em `execute/` (exemplo: `execute/newresource/`)
4. Implementar funções para cada operação
5. Adicionar as importações e referências em `execute/index.ts`
6. Atualizar a classe `PipefyAPI` para suportar o novo recurso

### Adicionando Novas Operações

Para adicionar uma nova operação a um recurso existente:

1. Adicionar a operação às opções em `properties/{resource}.operations.ts`
2. Implementar os campos necessários para a operação
3. Criar uma função de implementação em `execute/{resource}/`
4. Adicionar a importação e referência em `execute/index.ts`
5. Atualizar o método correspondente na classe `PipefyAPI` 