# n8n-nodes-pipefy

Este pacote contém nós para n8n para interagir com a [API do Pipefy](https://developers.pipefy.com/).

[n8n](https://n8n.io/) é uma ferramenta de automação de workflows extensível que permite conectar diferentes serviços e aplicações.

## Recursos Disponíveis

O nó Pipefy para n8n permite:

### Pipes
- Consultar detalhes de um pipe
- Criar novos pipes
- Atualizar pipes existentes
- Excluir pipes

### Cards
- Consultar detalhes de um card
- Criar novos cards
- Atualizar cards existentes
- Mover cards entre fases
- Excluir cards

### Webhooks
- Listar webhooks da organização
- Criar novos webhooks
- Atualizar webhooks existentes
- Excluir webhooks

### Organizações
- Consultar detalhes de organizações
- Listar todas as organizações do usuário

## Instalação

### Na instalação local do n8n

Siga estes passos para instalar o pacote em uma instalação local do n8n:

```bash
# Navegue até a pasta de instalação do n8n
cd /caminho/para/n8n

# Instale o pacote
npm install n8n-nodes-pipefy

# Reinicie o n8n
npm run start
```

### Em Docker

Se você estiver executando o n8n em Docker, você pode usar um arquivo personalizado `docker-compose.yml`:

```yaml
version: '3'

services:
  n8n:
    image: n8nio/n8n
    ports:
      - "5678:5678"
    environment:
      - N8N_CUSTOM_EXTENSIONS=n8n-nodes-pipefy
    volumes:
      - ~/.n8n:/home/node/.n8n
```

### Via npm/pnpm/yarn

```bash
# Usando npm
npm install n8n-nodes-pipefy

# Usando pnpm
pnpm add n8n-nodes-pipefy

# Usando yarn
yarn add n8n-nodes-pipefy
```

## Autenticação

Para usar o nó Pipefy, você precisa obter um token de API do Pipefy:

1. Faça login na sua conta do Pipefy
2. Vá para seu perfil > API Token
3. Copie o token gerado

![Como obter o token do Pipefy](https://developers.pipefy.com/imgs/token-api.png)

Ao configurar o nó no n8n, use esse token nas credenciais:

1. Abra o n8n
2. Vá para **Configurações** > **Credenciais**
3. Clique em **Criar Nova Credencial**
4. Escolha **Pipefy API**
5. Cole seu token de API no campo correspondente
6. Salve a credencial

## Exemplos de Uso

Aqui estão alguns exemplos de como usar o nó Pipefy em workflows do n8n:

### Exemplo 1: Criar um Card quando um formulário for preenchido

Este exemplo cria um novo card em um pipe específico quando um formulário web é preenchido:

1. Use um nó **Webhook** para receber os dados do formulário
2. Conecte-o a um nó **Pipefy**
3. Configure o nó Pipefy:
   - **Recurso**: Card
   - **Operação**: Create
   - **Pipe ID**: [ID do seu pipe]
   - **Título**: `{{$json.nome}}` (substitua 'nome' pelo campo do seu formulário)
   - Em **Campos do Formulário**, adicione os campos necessários mapeando-os a partir dos dados do formulário

### Exemplo 2: Mover Cards Automaticamente

Este exemplo move cards automaticamente para uma próxima fase quando uma condição for atendida:

1. Use um nó **Schedule** para executar periodicamente
2. Conecte a um nó **Pipefy** para listar cards:
   - **Recurso**: Card
   - **Operação**: Get
   - **Card ID**: [ID do card]
   
3. Adicione um nó **IF** para verificar alguma condição
4. Na saída "verdadeiro" do IF, adicione outro nó **Pipefy**:
   - **Recurso**: Card
   - **Operação**: Move
   - **Card ID**: `{{$json.id}}`
   - **Destination Phase ID**: [ID da fase de destino]

### Exemplo 3: Configurar Webhooks Automáticos

Este exemplo configura um webhook automaticamente:

1. Adicione um nó **Pipefy**:
   - **Recurso**: Webhook
   - **Operação**: Create
   - **Pipe ID**: [ID do seu pipe]
   - **URL**: URL do webhook do n8n
   - **Ações**: Selecione as ações que devem disparar o webhook (card:create, card:move, etc.)
   - **Headers**: Adicione headers de segurança se necessário

## Detalhes das Operações

### Operações com Pipes

#### Consultar Pipe (Get)

Obtém detalhes de um pipe específico.

Parâmetros:
- **Pipe ID**: ID único do pipe
- **Opções**: Configurações adicionais para incluir fases, cards e campos

#### Criar Pipe (Create)

Cria um novo pipe na organização.

Parâmetros:
- **Organization ID**: ID da organização
- **Nome**: Nome do pipe
- **Descrição**: Descrição do pipe
- **Ícone**: Ícone para o pipe (opcional)

### Operações com Cards

#### Criar Card (Create)

Cria um novo card em um pipe.

Parâmetros:
- **Pipe ID**: ID do pipe onde o card será criado
- **Título**: Título do card
- **Campos do Formulário**: Valores para os campos personalizados do pipe
- **Opções**: Configurações adicionais como fase de destino

#### Mover Card (Move)

Move um card para outra fase.

Parâmetros:
- **Card ID**: ID do card a ser movido
- **Destination Phase ID**: ID da fase de destino

### Operações com Webhooks

#### Listar Webhooks (List)

Lista webhooks configurados em um pipe.

Parâmetros:
- **Pipe ID**: ID do pipe

#### Criar Webhook (Create)

Cria um novo webhook para um pipe.

Parâmetros:
- **Pipe ID**: ID do pipe
- **URL**: URL de destino para o webhook
- **Ações**: Eventos que disparam o webhook (array)
- **Headers**: Headers adicionais para a requisição (opcional)

## Solução de Problemas

### Erros Comuns

1. **Token Inválido**: Verifique se o token da API está correto e não expirou
2. **Permissões Insuficientes**: Certifique-se de que o usuário tem permissões para as operações desejadas
3. **ID Não Encontrado**: Verifique se os IDs de pipes, cards e fases estão corretos

### Como Encontrar IDs

- **Pipe ID**: Disponível na URL quando você está visualizando um pipe. Exemplo: `https://app.pipefy.com/pipes/123456` (o ID é 123456)
- **Card ID**: Disponível na URL quando você abre um card. Exemplo: `https://app.pipefy.com/pipes/123456/cards/789` (o ID é 789)
- **Phase ID**: Pode ser obtido consultando o pipe e observando os IDs das fases retornadas

## Desenvolvimento

Se você deseja contribuir para este projeto:

1. Clone o repositório
2. Instale as dependências: `pnpm install`
3. Faça suas alterações
4. Execute o build: `pnpm build`
5. Teste as alterações localmente

## Licença

[MIT](LICENSE.md) 