# Documentação da API de Phases do Pipefy

## Visão Geral
Esta documentação detalha os endpoints relacionados a Phases (Fases) na API do Pipefy. Phases são as etapas que compõem um pipe, representando os diferentes estágios pelos quais os cards passam durante seu ciclo de vida.

## Índice

1. [Introdução](#introdução)
2. [Autenticação](#autenticação)
3. [Endpoints](#endpoints)
4. [Exemplos](#exemplos)

## Introdução

Phases são componentes fundamentais do Pipefy que definem:
- Etapas do processo
- Campos específicos de cada fase
- Automações e regras
- Permissões e restrições
- Condições de movimentação de cards

## Autenticação

Para acessar a API do Pipefy, é necessário um token de autenticação. Este token deve ser incluído no header da requisição:

```graphql
Authorization: Bearer {seu_token}
```

## Endpoints

### Consultar Fase
```graphql
query {
  phase(id: "phase_id") {
    id
    name
    description
    done
    cards_count
    fields {
      id
      label
      type
    }
    cards(first: 10) {
      edges {
        node {
          id
          title
        }
      }
    }
  }
}
```

### Criar Fase
```graphql
mutation {
  createPhase(input: {
    pipe_id: "pipe_id",
    name: "Nova Fase",
    description: "Descrição da fase",
    done: false
  }) {
    phase {
      id
      name
      description
    }
  }
}
```

### Atualizar Fase
```graphql
mutation {
  updatePhase(input: {
    id: "phase_id",
    name: "Nome Atualizado",
    description: "Nova descrição",
    can_receive_card: true
  }) {
    phase {
      id
      name
      description
      can_receive_card
    }
  }
}
```

### Deletar Fase
```graphql
mutation {
  deletePhase(input: {
    id: "phase_id"
  }) {
    success
  }
}
```

## Exemplos

### Exemplo de Consulta Completa
```graphql
query {
  phase(id: "phase_id") {
    id
    name
    description
    done
    cards_count
    firstCardIndex
    lastCardIndex
    can_receive_card
    can_create_card
    
    fields {
      id
      label
      type
      required
      description
    }
    
    cards(first: 10) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          id
          title
          current_phase {
            name
          }
          fields {
            name
            value
          }
        }
      }
    }
    
    pipe {
      id
      name
      phases_count
    }
  }
}
```

### Exemplo de Criação com Campos
```graphql
mutation {
  createPhase(input: {
    pipe_id: "pipe_id",
    name: "Análise de Crédito",
    description: "Fase para análise de crédito do cliente",
    done: false,
    can_receive_card: true,
    fields: [
      {
        label: "Score",
        type: "number",
        required: true,
        help: "Pontuação do cliente"
      },
      {
        label: "Resultado",
        type: "select",
        required: true,
        options: [
          { name: "Aprovado" },
          { name: "Reprovado" },
          { name: "Pendente" }
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

## Observações Importantes

1. Fases podem ter campos específicos
2. A ordem das fases pode ser importante para o processo
3. Fases podem ter restrições de movimentação de cards
4. Algumas operações podem exigir permissões especiais
5. Fases marcadas como "done" geralmente representam conclusão do processo
6. A exclusão de fases pode afetar cards e automações
7. O campo `can_receive_card` controla se cards podem ser movidos para a fase
