# Contexto Técnico

## Tecnologias Utilizadas
1. **Node.js**: Ambiente de execução
2. **TypeScript**: Linguagem de programação
3. **n8n-workflow**: Framework base do n8n
4. **GraphQL**: Protocolo de comunicação com a API do Pipefy

## Configuração de Desenvolvimento
### Dependências Principais
```json
{
  "dependencies": {
    "n8n-workflow": "^0.107.0"
  },
  "devDependencies": {
    "@types/express": "^4.17.17",
    "@types/request-promise-native": "~1.0.18",
    "@typescript-eslint/eslint-plugin": "~5.45",
    "@typescript-eslint/parser": "~5.45",
    "eslint": "^8.29.0",
    "eslint-plugin-n8n-nodes-base": "^1.11.0",
    "gulp": "^4.2.0",
    "n8n-core": "~0.125.0",
    "prettier": "^2.7.1",
    "typescript": "~4.8.4"
  }
}
```

### Scripts
```json
{
  "scripts": {
    "build": "tsc && gulp build:icons",
    "dev": "tsc --watch",
    "format": "prettier nodes credentials --write",
    "lint": "eslint nodes credentials package.json",
    "lintfix": "eslint nodes credentials package.json --fix",
    "prepublishOnly": "npm run build && npm run lint"
  }
}
```

## Restrições Técnicas
1. **Versão do n8n**: Compatível com n8n v0.107.0 ou superior
2. **Node.js**: Versão 14 ou superior
3. **API Pipefy**: Requer token de autenticação
4. **Rate Limiting**: Respeitar limites da API do Pipefy

## Dependências
### Internas
- `n8n-workflow`: Framework base do n8n
- `n8n-core`: Funcionalidades core do n8n

### Externas
- API GraphQL do Pipefy

## Estrutura do Projeto
```
n8n-nodes-pipefy/
├── nodes/
│   └── Pipefy/
│       ├── Pipefy.node.ts
│       └── pipefy.svg
├── credentials/
│   └── PipefyApi.credentials.ts
├── memory-bank/
│   ├── projectbrief.md
│   ├── productContext.md
│   ├── systemPatterns.md
│   ├── techContext.md
│   ├── activeContext.md
│   └── progress.md
├── package.json
├── tsconfig.json
└── README.md
```

## Configurações
### TypeScript
```json
{
  "compilerOptions": {
    "strict": true,
    "module": "commonjs",
    "target": "es2019",
    "outDir": "./dist",
    "rootDir": ".",
    "types": ["node"],
    "esModuleInterop": true
  }
}
```

### ESLint
- Configuração padrão do n8n
- Plugin específico para nós n8n

## Segurança
1. **Autenticação**: Via token de API
2. **Validação de Entrada**: Todos os inputs são validados
3. **Sanitização**: Dados são sanitizados antes do envio
4. **Tratamento de Erros**: Erros são capturados e tratados adequadamente

## Monitoramento e Logs
1. **Erros**: Capturados e registrados
2. **Webhooks**: Eventos registrados
3. **Operações**: Resultados registrados

## Deployment
1. **Build**: `npm run build`
2. **Publicação**: `npm publish`
3. **Versionamento**: Semântico (MAJOR.MINOR.PATCH)
4. **Tags**: Criadas para cada release 