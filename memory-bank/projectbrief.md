# N8N Node para Pipefy

## Visão Geral
Este é um nó personalizado para o n8n que permite integração completa com a API do Pipefy. O nó fornece uma interface amigável para interagir com todas as principais funcionalidades do Pipefy, incluindo gerenciamento de cards, pipes, fases, organizações, usuários, tabelas e registros de tabela.

## Objetivos
1. Fornecer uma interface intuitiva para interagir com a API do Pipefy
2. Suportar todas as operações principais do Pipefy
3. Manter compatibilidade com as últimas versões do n8n
4. Seguir as melhores práticas de desenvolvimento do n8n

## Requisitos Principais
1. Autenticação via API Token do Pipefy
2. Suporte para operações CRUD em:
   - Cards
   - Pipes
   - Phases
   - Organizations
   - Users
   - Tables
   - Table Records
3. Suporte para webhooks
4. Tratamento adequado de erros
5. Documentação clara e completa

## Escopo do Projeto
### Incluído
- Operações completas de CRUD para todos os recursos principais
- Suporte para campos personalizados
- Gerenciamento de webhooks
- Validação de dados
- Tratamento de erros
- Documentação detalhada

### Não Incluído
- Interface de usuário personalizada
- Autenticação OAuth
- Cache de dados
- Operações em lote

## Versão Atual: 1.4.0
- Suporte completo para operações de Table e Table Records
- Campos personalizados para Pipes e Phases
- Melhorias na documentação 