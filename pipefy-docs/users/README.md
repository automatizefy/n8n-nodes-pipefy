# Documentação da API de Users do Pipefy

## Visão Geral
Esta documentação detalha os endpoints relacionados a Users (Usuários) na API do Pipefy. Users são os usuários que interagem com a plataforma, podendo ter diferentes papéis e permissões em diferentes organizações.

## Índice

1. [Introdução](#introdução)
2. [Autenticação](#autenticação)
3. [Endpoints](#endpoints)
4. [Exemplos](#exemplos)

## Introdução

Users no Pipefy representam:
- Usuários da plataforma
- Membros de organizações
- Responsáveis por cards
- Participantes de pipes
- Administradores e colaboradores

## Autenticação

Para acessar a API do Pipefy, é necessário um token de autenticação. Este token deve ser incluído no header da requisição:

```graphql
Authorization: Bearer {seu_token}
```

## Endpoints

### Consultar Usuário
```graphql
query {
  me {
    id
    name
    email
    username
    created_at
    locale
    timezone
    avatar_url
    organizations {
      edges {
        node {
          id
          name
        }
      }
    }
  }
}
```

### Buscar Usuário por ID
```graphql
query {
  user(id: "user_id") {
    id
    name
    email
    username
    created_at
    organizations {
      edges {
        node {
          id
          name
          role_name
        }
      }
    }
  }
}
```

### Atualizar Usuário
```graphql
mutation {
  updateUser(input: {
    name: "Novo Nome",
    avatar_url: "https://exemplo.com/avatar.jpg",
    locale: "pt-BR",
    timezone: "America/Sao_Paulo"
  }) {
    user {
      id
      name
      avatar_url
      locale
      timezone
    }
  }
}
```

### Buscar Preferenciais do Usuário
```graphql
query {
  me {
    preferences {
      locale
      timezone
      notification_settings {
        email_notifications
        push_notifications
      }
      interface_settings {
        theme
        compact_mode
      }
    }
  }
}
```

## Exemplos

### Exemplo de Consulta Completa
```graphql
query {
  me {
    id
    name
    email
    username
    created_at
    avatar_url
    locale
    timezone
    
    # Organizações
    organizations {
      edges {
        node {
          id
          name
          role_name
          created_at
        }
      }
    }
    
    # Pipes
    pipes {
      edges {
        node {
          id
          name
          role_name
        }
      }
    }
    
    # Cards Atribuídos
    assigned_cards(first: 10) {
      edges {
        node {
          id
          title
          current_phase {
            name
          }
          pipe {
            name
          }
        }
      }
    }
    
    # Preferências
    preferences {
      locale
      timezone
      notification_settings {
        email_notifications
        push_notifications
      }
      interface_settings {
        theme
        compact_mode
      }
    }
  }
}
```

### Exemplo de Atualização de Preferências
```graphql
mutation {
  updateUserPreferences(input: {
    locale: "pt-BR",
    timezone: "America/Sao_Paulo",
    notification_settings: {
      email_notifications: true,
      push_notifications: true
    },
    interface_settings: {
      theme: "light",
      compact_mode: false
    }
  }) {
    user {
      preferences {
        locale
        timezone
        notification_settings {
          email_notifications
          push_notifications
        }
        interface_settings {
          theme
          compact_mode
        }
      }
    }
  }
}
```

## Observações Importantes

1. Usuários podem pertencer a múltiplas organizações
2. Cada usuário tem suas próprias preferências
3. As permissões são gerenciadas por organização
4. Alguns campos podem ser restritos por privacidade
5. Notificações podem ser personalizadas
6. O idioma e fuso horário afetam a experiência
7. Os tokens de acesso são pessoais e intransferíveis
