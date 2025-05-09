# Documentação da API de Organizations do Pipefy

## Visão Geral
Esta documentação detalha os endpoints relacionados a Organizations (Organizações) na API do Pipefy. Organizations são as entidades principais que agrupam pipes, tabelas e usuários em uma estrutura organizacional.

## Índice

1. [Introdução](#introdução)
2. [Autenticação](#autenticação)
3. [Endpoints](#endpoints)
4. [Exemplos](#exemplos)

## Introdução

Organizations no Pipefy permitem:
- Gerenciar múltiplos pipes
- Administrar usuários e permissões
- Configurar integrações
- Definir padrões organizacionais
- Controlar recursos compartilhados

## Autenticação

Para acessar a API do Pipefy, é necessário um token de autenticação. Este token deve ser incluído no header da requisição:

```graphql
Authorization: Bearer {seu_token}
```

## Endpoints

### Consultar Organização
```graphql
query {
  organization(id: "org_id") {
    id
    name
    created_at
    pipes {
      edges {
        node {
          id
          name
        }
      }
    }
    members {
      edges {
        node {
          user {
            id
            name
            email
          }
          role_name
        }
      }
    }
  }
}
```

### Criar Organização
```graphql
mutation {
  createOrganization(input: {
    name: "Nova Organização",
    industry: "Tecnologia",
    description: "Descrição da organização"
  }) {
    organization {
      id
      name
      created_at
    }
  }
}
```

### Atualizar Organização
```graphql
mutation {
  updateOrganization(input: {
    id: "org_id",
    name: "Nome Atualizado",
    description: "Nova descrição"
  }) {
    organization {
      id
      name
      description
    }
  }
}
```

### Deletar Organização
```graphql
mutation {
  deleteOrganization(input: {
    id: "org_id"
  }) {
    success
  }
}
```

## Exemplos

### Exemplo de Consulta Completa
```graphql
query {
  organization(id: "org_id") {
    id
    name
    created_at
    updated_at
    
    # Informações Gerais
    description
    members_count
    pipes_count
    tables_count
    
    # Membros
    members(first: 10) {
      edges {
        node {
          user {
            id
            name
            email
            username
          }
          role_name
          role {
            id
            name
            description
          }
        }
      }
    }
    
    # Pipes
    pipes(first: 10) {
      edges {
        node {
          id
          name
          phases_count
          cards_count
          members_count
        }
      }
    }
    
    # Tabelas
    tables(first: 10) {
      edges {
        node {
          id
          name
          records_count
        }
      }
    }
  }
}
```

### Exemplo de Gerenciamento de Membros
```graphql
mutation {
  # Adicionar Membro
  createOrganizationMember(input: {
    organization_id: "org_id",
    user_email: "usuario@email.com",
    role_name: "admin"
  }) {
    organization_member {
      user {
        name
        email
      }
      role_name
    }
  }

  # Atualizar Papel do Membro
  updateOrganizationMember(input: {
    organization_id: "org_id",
    user_id: "user_id",
    role_name: "member"
  }) {
    organization_member {
      user {
        name
      }
      role_name
    }
  }

  # Remover Membro
  deleteOrganizationMember(input: {
    organization_id: "org_id",
    user_id: "user_id"
  }) {
    success
  }
}
```

## Observações Importantes

1. A organização é a estrutura principal no Pipefy
2. Permissões são gerenciadas no nível da organização
3. Recursos são compartilhados dentro da organização
4. Algumas operações requerem privilégios administrativos
5. Integrações são configuradas no nível da organização
6. Limites de uso são definidos por organização
7. Backups e exportações são gerenciados pela organização
