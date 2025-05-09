# Exemplos Práticos de Uso da API de Users

## Cenários Comuns

### 1. Gerenciamento de Perfil
```graphql
# Consultar Perfil Atual
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
    preferences {
      locale
      timezone
      notification_settings {
        email_notifications
        push_notifications
      }
    }
  }
}

# Atualizar Perfil
mutation {
  updateUser(input: {
    name: "João Silva",
    username: "joaosilva",
    avatar_url: "https://exemplo.com/avatar.jpg",
    locale: "pt-BR",
    timezone: "America/Sao_Paulo"
  }) {
    user {
      id
      name
      username
      avatar_url
      locale
      timezone
    }
  }
}
```

### 2. Gerenciar Notificações
```graphql
mutation {
  updateUserPreferences(input: {
    notification_settings: {
      # Notificações por Email
      email_notifications: true,
      email_notification_settings: {
        assigned_cards: true,
        due_date_alerts: true,
        mentioned_in_comments: true,
        pipe_updates: true
      },
      
      # Notificações Push
      push_notifications: true,
      push_notification_settings: {
        card_moved: true,
        new_comments: true,
        overdue_cards: true
      }
    }
  }) {
    user {
      preferences {
        notification_settings {
          email_notifications
          email_notification_settings {
            assigned_cards
            due_date_alerts
          }
          push_notifications
          push_notification_settings {
            card_moved
            new_comments
          }
        }
      }
    }
  }
}
```

### 3. Consultar Atividades e Responsabilidades
```graphql
query {
  me {
    # Cards Atribuídos
    assigned_cards(
      first: 10,
      search: {
        overdue: true,
        due_date_from: "2025-01-01",
        due_date_to: "2025-12-31"
      }
    ) {
      edges {
        node {
          id
          title
          due_date
          late
          current_phase {
            name
          }
          pipe {
            name
          }
        }
      }
    }
    
    # Organizações e Papéis
    organizations {
      edges {
        node {
          id
          name
          role_name
          pipes {
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
    }
  }
}
```

### 4. Personalização da Interface
```graphql
mutation {
  updateUserPreferences(input: {
    interface_settings: {
      theme: "dark",
      compact_mode: true,
      default_view: "kanban",
      accessibility_settings: {
        high_contrast: false,
        large_text: false
      }
    }
  }) {
    user {
      preferences {
        interface_settings {
          theme
          compact_mode
          default_view
          accessibility_settings {
            high_contrast
            large_text
          }
        }
      }
    }
  }
}
```

### 5. Buscar Usuários da Organização
```graphql
query {
  organization(id: "org_id") {
    members(
      first: 20,
      search: {
        term: "desenvolvedor",
        role_names: ["admin", "member"]
      }
    ) {
      edges {
        node {
          user {
            id
            name
            email
            username
            avatar_url
          }
          role_name
          created_at
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
}
```

## Melhores Práticas

### 1. Gerenciamento de Permissões
```graphql
query {
  me {
    organizations {
      edges {
        node {
          name
          role {
            name
            permissions {
              can_manage_users
              can_manage_pipes
              can_manage_tables
              can_manage_reports
            }
          }
        }
      }
    }
  }
}
```

### 2. Validação de Acessos
```graphql
query {
  pipe(id: "pipe_id") {
    can_manage_pipe
    can_create_cards
    can_delete_cards
    can_update_cards
    members {
      user {
        name
      }
      role_name
      can_create_cards
      can_update_cards
    }
  }
}
```

## Dicas de Implementação

1. **Segurança**
   - Gerencie tokens com cuidado
   - Valide permissões antes das ações
   - Mantenha logs de atividades
   - Implemente timeouts adequados

2. **Personalização**
   - Configure notificações adequadamente
   - Adapte interface às necessidades
   - Mantenha preferências atualizadas
   - Considere acessibilidade

3. **Organizações**
   - Gerencie múltiplas organizações
   - Mantenha papéis consistentes
   - Documente responsabilidades
   - Atualize permissões regularmente

4. **Performance**
   - Use paginação em listas
   - Cache dados do perfil
   - Otimize consultas frequentes
   - Monitore limites de uso

5. **Privacidade**
   - Proteja dados sensíveis
   - Respeite configurações de privacidade
   - Implemente GDPR se necessário
   - Mantenha registros seguros
