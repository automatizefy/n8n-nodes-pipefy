const fs = require('fs');
const path = require('path');

// Criar diretórios se não existirem
const directories = [
  'nodes/Pipefy/execute/card',
  'nodes/Pipefy/execute/webhook',
  'nodes/Pipefy/execute/organization'
];

directories.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Arquivo createCard.ts
const createCardContent = `import { IExecuteFunctions } from 'n8n-workflow';
import { pipefy } from '../../PipefyApi';

/**
 * Cria um novo card no Pipefy
 */
export async function createCard(this: IExecuteFunctions) {
    const pipeId = this.getNodeParameter('pipeId', 0) as string;
    const title = this.getNodeParameter('title', 0) as string;
    const options = this.getNodeParameter('options', 0, {}) as {
        phaseId?: string,
        dueDate?: string,
        fields?: Array<{ name: string, value: string }>
    };
    
    const variables: Record<string, any> = {
        pipeId,
        title,
        dueDate: options.dueDate,
        phaseId: options.phaseId,
    };
    
    let fieldsQuery = '';
    let fieldsVariables = {};
    
    if (options.fields && options.fields.length > 0) {
        fieldsQuery = \`
            fields: $fields
        \`;
        
        fieldsVariables = {
            fields: options.fields.map(field => ({
                field_id: field.name,
                field_value: field.value,
            })),
        };
    }
    
    const query = \`
        mutation CreateCard($pipeId: ID!, $title: String!, $dueDate: DateTime, $phaseId: ID, $fields: [FieldValueInput!]) {
            createCard(input: {
                pipe_id: $pipeId,
                title: $title,
                due_date: $dueDate,
                phase_id: $phaseId
                \${fieldsQuery}
            }) {
                card {
                    id
                    title
                    due_date
                    current_phase {
                        id
                        name
                    }
                    created_at
                    updated_at
                }
            }
        }
    \`;
    
    const response = await pipefy.graphqlRequest(this, query, { ...variables, ...fieldsVariables });
    
    return response.createCard.card;
}`;

// Arquivo updateCard.ts
const updateCardContent = `import { IExecuteFunctions } from 'n8n-workflow';
import { pipefy } from '../../PipefyApi';

/**
 * Atualiza um card existente no Pipefy
 */
export async function updateCard(this: IExecuteFunctions) {
    const cardId = this.getNodeParameter('cardId', 0) as string;
    const options = this.getNodeParameter('options', 0, {}) as {
        title?: string,
        dueDate?: string,
        fields?: Array<{ name: string, value: string }>
    };
    
    const variables: Record<string, any> = {
        cardId,
        title: options.title,
        dueDate: options.dueDate,
    };
    
    let fieldsQuery = '';
    let fieldsVariables = {};
    
    if (options.fields && options.fields.length > 0) {
        fieldsQuery = \`
            fields: $fields
        \`;
        
        fieldsVariables = {
            fields: options.fields.map(field => ({
                field_id: field.name,
                field_value: field.value,
            })),
        };
    }
    
    const query = \`
        mutation UpdateCard($cardId: ID!, $title: String, $dueDate: DateTime, $fields: [FieldValueInput!]) {
            updateCard(input: {
                id: $cardId,
                title: $title,
                due_date: $dueDate
                \${fieldsQuery}
            }) {
                card {
                    id
                    title
                    due_date
                    current_phase {
                        id
                        name
                    }
                    created_at
                    updated_at
                }
            }
        }
    \`;
    
    const response = await pipefy.graphqlRequest(this, query, { ...variables, ...fieldsVariables });
    
    return response.updateCard.card;
}`;

// Arquivo moveCard.ts
const moveCardContent = `import { IExecuteFunctions } from 'n8n-workflow';
import { pipefy } from '../../PipefyApi';

/**
 * Move um card para outra fase no Pipefy
 */
export async function moveCard(this: IExecuteFunctions) {
    const cardId = this.getNodeParameter('cardId', 0) as string;
    const destinationPhaseId = this.getNodeParameter('destinationPhaseId', 0) as string;
    
    const variables = {
        cardId,
        destinationPhaseId,
    };
    
    const query = \`
        mutation MoveCard($cardId: ID!, $destinationPhaseId: ID!) {
            moveCardToPhase(input: {
                card_id: $cardId,
                destination_phase_id: $destinationPhaseId
            }) {
                card {
                    id
                    title
                    current_phase {
                        id
                        name
                    }
                }
            }
        }
    \`;
    
    const response = await pipefy.graphqlRequest(this, query, variables);
    
    return response.moveCardToPhase.card;
}`;

// Arquivo deleteCard.ts
const deleteCardContent = `import { IExecuteFunctions } from 'n8n-workflow';
import { pipefy } from '../../PipefyApi';

/**
 * Exclui um card no Pipefy
 */
export async function deleteCard(this: IExecuteFunctions) {
    const cardId = this.getNodeParameter('cardId', 0) as string;
    
    const variables = {
        cardId,
    };
    
    const query = \`
        mutation DeleteCard($cardId: ID!) {
            deleteCard(input: {
                id: $cardId
            }) {
                success
            }
        }
    \`;
    
    const response = await pipefy.graphqlRequest(this, query, variables);
    
    return {
        id: cardId,
        success: response.deleteCard.success,
    };
}`;

// Implementação dos arquivos de webhook
const listWebhooksContent = `import { IExecuteFunctions } from 'n8n-workflow';
import { pipefy } from '../../PipefyApi';

/**
 * Lista webhooks de um pipe no Pipefy
 */
export async function listWebhooks(this: IExecuteFunctions) {
    const pipeId = this.getNodeParameter('pipeId', 0) as string;
    
    const variables = {
        pipeId,
    };
    
    const query = \`
        query ListWebhooks($pipeId: ID!) {
            pipe(id: $pipeId) {
                webhooks {
                    id
                    url
                    actions
                    headers
                    email_all_events
                }
            }
        }
    \`;
    
    const response = await pipefy.graphqlRequest(this, query, variables);
    
    return response.pipe.webhooks;
}`;

const createWebhookContent = `import { IExecuteFunctions } from 'n8n-workflow';
import { pipefy } from '../../PipefyApi';

/**
 * Cria um novo webhook para um pipe no Pipefy
 */
export async function createWebhook(this: IExecuteFunctions) {
    const pipeId = this.getNodeParameter('pipeId', 0) as string;
    const url = this.getNodeParameter('url', 0) as string;
    const actions = this.getNodeParameter('actions', 0) as string[];
    const headers = this.getNodeParameter('headers', 0, {}) as Record<string, string>;
    
    const variables = {
        pipeId,
        url,
        actions,
        headers: JSON.stringify(headers),
    };
    
    const query = \`
        mutation CreateWebhook($pipeId: ID!, $url: String!, $actions: [WebhookActions!]!, $headers: String) {
            createWebhook(input: {
                pipe_id: $pipeId,
                url: $url,
                actions: $actions,
                headers: $headers
            }) {
                webhook {
                    id
                    url
                    actions
                    headers
                    email_all_events
                }
            }
        }
    \`;
    
    const response = await pipefy.graphqlRequest(this, query, variables);
    
    return response.createWebhook.webhook;
}`;

const updateWebhookContent = `import { IExecuteFunctions } from 'n8n-workflow';
import { pipefy } from '../../PipefyApi';

/**
 * Atualiza um webhook existente no Pipefy
 */
export async function updateWebhook(this: IExecuteFunctions) {
    const webhookId = this.getNodeParameter('webhookId', 0) as string;
    const options = this.getNodeParameter('options', 0, {}) as {
        url?: string,
        actions?: string[],
        headers?: Record<string, string>,
    };
    
    const variables: Record<string, any> = {
        webhookId,
        url: options.url,
        actions: options.actions,
        headers: options.headers ? JSON.stringify(options.headers) : undefined,
    };
    
    // Remover campos undefined
    Object.keys(variables).forEach(key => {
        if (variables[key] === undefined) {
            delete variables[key];
        }
    });
    
    const query = \`
        mutation UpdateWebhook($webhookId: ID!, $url: String, $actions: [WebhookActions!], $headers: String) {
            updateWebhook(input: {
                id: $webhookId,
                url: $url,
                actions: $actions,
                headers: $headers
            }) {
                webhook {
                    id
                    url
                    actions
                    headers
                    email_all_events
                }
            }
        }
    \`;
    
    const response = await pipefy.graphqlRequest(this, query, variables);
    
    return response.updateWebhook.webhook;
}`;

const deleteWebhookContent = `import { IExecuteFunctions } from 'n8n-workflow';
import { pipefy } from '../../PipefyApi';

/**
 * Exclui um webhook no Pipefy
 */
export async function deleteWebhook(this: IExecuteFunctions) {
    const webhookId = this.getNodeParameter('webhookId', 0) as string;
    
    const variables = {
        webhookId,
    };
    
    const query = \`
        mutation DeleteWebhook($webhookId: ID!) {
            deleteWebhook(input: {
                id: $webhookId
            }) {
                success
            }
        }
    \`;
    
    const response = await pipefy.graphqlRequest(this, query, variables);
    
    return {
        id: webhookId,
        success: response.deleteWebhook.success,
    };
}`;

// Implementação dos arquivos de organização
const getOrganizationContent = `import { IExecuteFunctions } from 'n8n-workflow';
import { pipefy } from '../../PipefyApi';

/**
 * Obtém detalhes de uma organização no Pipefy
 */
export async function getOrganization(this: IExecuteFunctions) {
    const organizationId = this.getNodeParameter('organizationId', 0) as string;
    const options = this.getNodeParameter('options', 0, {}) as {
        includePipes?: boolean,
        includeMembers?: boolean,
        includeTables?: boolean,
    };
    
    // Construir campos da consulta com base nas opções
    let pipesQuery = '';
    let membersQuery = '';
    let tablesQuery = '';
    
    if (options.includePipes) {
        pipesQuery = \`
            pipes(first: 20) {
                edges {
                    node {
                        id
                        name
                        description
                        created_at
                        updated_at
                    }
                }
            }
        \`;
    }
    
    if (options.includeMembers) {
        membersQuery = \`
            members(first: 20) {
                edges {
                    node {
                        user {
                            id
                            name
                            email
                            username
                        }
                        role
                    }
                }
            }
        \`;
    }
    
    if (options.includeTables) {
        tablesQuery = \`
            tables(first: 20) {
                edges {
                    node {
                        id
                        name
                        description
                    }
                }
            }
        \`;
    }
    
    const query = \`
        query GetOrganization($id: ID!) {
            organization(id: $id) {
                id
                name
                created_at
                updated_at
                \${pipesQuery}
                \${membersQuery}
                \${tablesQuery}
            }
        }
    \`;
    
    const variables = {
        id: organizationId,
    };
    
    const response = await pipefy.graphqlRequest(this, query, variables);
    
    return response.organization;
}`;

const listOrganizationsContent = `import { IExecuteFunctions } from 'n8n-workflow';
import { pipefy } from '../../PipefyApi';

/**
 * Lista organizações do usuário no Pipefy
 */
export async function listOrganizations(this: IExecuteFunctions) {
    const options = this.getNodeParameter('options', 0, {}) as {
        first?: number,
    };
    
    const first = options.first || 20;
    
    const variables = {
        first,
    };
    
    const query = \`
        query ListOrganizations($first: Int!) {
            organizations(first: $first) {
                edges {
                    node {
                        id
                        name
                        created_at
                        updated_at
                    }
                }
            }
        }
    \`;
    
    const response = await pipefy.graphqlRequest(this, query, variables);
    
    return response.organizations.edges.map((edge: { node: any }) => edge.node);
}`;

// Mapeamento de arquivos e conteúdo
const files = {
  'nodes/Pipefy/execute/card/createCard.ts': createCardContent,
  'nodes/Pipefy/execute/card/updateCard.ts': updateCardContent,
  'nodes/Pipefy/execute/card/moveCard.ts': moveCardContent,
  'nodes/Pipefy/execute/card/deleteCard.ts': deleteCardContent,
  'nodes/Pipefy/execute/webhook/listWebhooks.ts': listWebhooksContent,
  'nodes/Pipefy/execute/webhook/createWebhook.ts': createWebhookContent,
  'nodes/Pipefy/execute/webhook/updateWebhook.ts': updateWebhookContent,
  'nodes/Pipefy/execute/webhook/deleteWebhook.ts': deleteWebhookContent,
  'nodes/Pipefy/execute/organization/getOrganization.ts': getOrganizationContent,
  'nodes/Pipefy/execute/organization/listOrganizations.ts': listOrganizationsContent,
};

// Criar todos os arquivos
Object.entries(files).forEach(([filePath, content]) => {
  fs.writeFileSync(filePath, content);
  console.log(`Arquivo ${filePath} criado com sucesso.`);
});

console.log('Todos os arquivos foram criados com sucesso!'); 