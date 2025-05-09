# Exemplos Práticos de Uso da API de Organizations

## Cenários Comuns

### 1. Estruturação Organizacional
```graphql
# Criar Organização com Configurações Iniciais
mutation {
  createOrganization(input: {
    name: "Tech Solutions Inc",
    industry: "Tecnologia",
    description: "Empresa de desenvolvimento de software",
    preferences: {
      default_locale: "pt-BR",
      timezone: "America/Sao_Paulo"
    }
  }) {
    organization {
      id
      name
      created_at
    }
  }
}
```

### 2. Gerenciamento de Membros
```graphql
# Adicionar Múltiplos Membros
mutation {
  # Administrador
  createOrganizationMember(input: {
    organization_id: "org_id",
    user_email: "admin@empresa.com",
    role_name: "admin",
    job_title: "Gerente de Projetos"
  }) {
    organization_member {
      user {
        name
        email
      }
      role_name
    }
  }
  
  # Membro Regular
  createOrganizationMember(input: {
    organization_id: "org_id",
    user_email: "usuario@empresa.com",
    role_name: "member",
    job_title: "Desenvolvedor"
  }) {
    organization_member {
      user {
        name
        email
      }
      role_name
    }
  }
}

# Consultar Membros com Filtros
query {
  organization(id: "org_id") {
    members(
      first: 20,
      search: {
        role_names: ["admin"],
        term: "gerente"
      }
    ) {
      edges {
        node {
          user {
            name
            email
          }
          role_name
          job_title
        }
      }
    }
  }
}
```

### 3. Análise de Recursos
```graphql
query {
  organization(id: "org_id") {
    # Estatísticas Gerais
    name
    members_count
    pipes_count
    tables_count
    
    # Pipes Ativos
    pipes(
      first: 10,
      search: {
        status: "active"
      }
    ) {
      edges {
        node {
          name
          cards_count
          phases_count
          members {
            user {
              name
            }
          }
        }
      }
    }
    
    # Tabelas com Registros
    tables(first: 10) {
      edges {
        node {
          name
          records_count
          created_at
        }
      }
    }
  }
}
```

### 4. Gestão de Permissões
```graphql
mutation {
  # Atualizar Permissões de Membro
  updateOrganizationMember(input: {
    organization_id: "org_id",
    user_id: "user_id",
    role_name: "admin",
    permissions: {
      can_manage_users: true,
      can_manage_pipes: true,
      can_manage_tables: true,
      can_manage_reports: true
    }
  }) {
    organization_member {
      user {
        name
      }
      role_name
      permissions {
        can_manage_users
        can_manage_pipes
        can_manage_tables
        can_manage_reports
      }
    }
  }
}
```

### 5. Integração com Outros Recursos
```graphql
mutation {
  # Criar Pipe na Organização
  createPipe(input: {
    organization_id: "org_id",
    name: "Processo de Vendas",
    description: "Pipeline de vendas",
    start_form_fields: [
      {
        label: "Cliente",
        type: "short_text",
        required: true
      }
    ]
  }) {
    pipe {
      id
      name
    }
  }
  
  # Criar Tabela na Organização
  createTable(input: {
    organization_id: "org_id",
    name: "Cadastro de Clientes",
    public: false,
    fields: [
      {
        label: "Nome",
        type: "short_text",
        required: true
      }
    ]
  }) {
    table {
      id
      name
    }
  }
}
```

## Melhores Práticas

### 1. Estruturação de Consultas
```graphql
query {
  organization(id: "org_id") {
    # Informações Essenciais
    id
    name
    created_at
    
    # Métricas
    members_count
    pipes_count
    tables_count
    
    # Detalhes de Membros (com paginação)
    members(first: 10) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          user {
            name
            email
          }
          role_name
          created_at
        }
      }
    }
  }
}
```

### 2. Validações e Tratamento de Erros
```graphql
mutation {
  createOrganizationMember(input: {
    organization_id: "org_id",
    user_email: "email@invalido",  # Email inválido para teste
    role_name: "invalid_role"  # Papel inválido para teste
  }) {
    organization_member {
      user {
        name
        email
      }
      role_name
    }
    errors {
      path
      message
      type
    }
  }
}
```

## Dicas de Implementação

1. **Planejamento**
   - Defina hierarquia clara
   - Estabeleça políticas de acesso
   - Planeje escalabilidade
   - Documente estrutura

2. **Segurança**
   - Gerencie permissões cuidadosamente
   - Monitore atividades
   - Implemente logs de auditoria
   - Controle acessos sensíveis

3. **Organização**
   - Mantenha estrutura consistente
   - Use nomenclatura clara
   - Agrupe recursos logicamente
   - Documente relacionamentos

4. **Performance**
   - Use paginação adequadamente
   - Otimize consultas
   - Monitore uso de recursos
   - Cache quando apropriado

5. **Manutenção**
   - Atualize documentação
   - Revise permissões periodicamente
   - Monitore crescimento
   - Faça backups regulares
