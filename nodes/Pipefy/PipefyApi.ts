import { IExecuteFunctions } from 'n8n-workflow';
import axios from 'axios';

// Interface para estruturar as consultas GraphQL
interface GraphQLQuery {
    query: string;
    variables?: Record<string, any>;
}

// Cliente API do Pipefy
class PipefyAPI {
    // Método base para executar requisições GraphQL
    public async graphqlRequest(
        executeFunctions: IExecuteFunctions,
        query: string,
        variables: Record<string, any> = {},
    ) {
        const credentials = await executeFunctions.getCredentials('pipefy');
        const endpoint = 'https://api.pipefy.com/graphql';
        
        const headers = {
            'Authorization': `Bearer ${credentials.apiToken}`,
            'Content-Type': 'application/json',
        };
        
        const data: GraphQLQuery = {
            query,
            variables,
        };
        
        try {
            const response = await axios({
                method: 'POST',
                url: endpoint,
                headers,
                data,
            });
            
            if (response.data.errors) {
                throw new Error(response.data.errors[0].message);
            }
            
            return response.data.data;
        } catch (error) {
            if (error.response) {
                const errorData = error.response.data;
                if (errorData.errors && errorData.errors.length > 0) {
                    throw new Error(`Erro na API do Pipefy: ${errorData.errors[0].message}`);
                }
                throw new Error(`Erro na requisição: ${error.response.status} ${error.response.statusText}`);
            }
            throw error;
        }
    }
    
    // Função principal para executar operações
    async execute(executeFunctions: IExecuteFunctions, resource: string, operation: string) {
        // Executa função específica com base no recurso e operação
        switch (resource) {
            case 'pipe':
                return await this.executePipeOperation(executeFunctions, operation);
            case 'card':
                return await this.executeCardOperation(executeFunctions, operation);
            case 'webhook':
                return await this.executeWebhookOperation(executeFunctions, operation);
            case 'organization':
                return await this.executeOrganizationOperation(executeFunctions, operation);
            default:
                throw new Error(`Recurso não suportado: ${resource}`);
        }
    }
    
    // Operações de Pipe
    private async executePipeOperation(executeFunctions: IExecuteFunctions, operation: string) {
        switch (operation) {
            case 'get':
                return await this.getPipe(executeFunctions);
            case 'create':
                return await this.createPipe(executeFunctions);
            case 'update':
                return await this.updatePipe(executeFunctions);
            case 'delete':
                return await this.deletePipe(executeFunctions);
            default:
                throw new Error(`Operação não suportada para pipe: ${operation}`);
        }
    }
    
    // Operações de Card
    private async executeCardOperation(executeFunctions: IExecuteFunctions, operation: string) {
        switch (operation) {
            case 'get':
                return await this.getCard(executeFunctions);
            case 'create':
            case 'criar':
                return await this.createCard(executeFunctions);
            case 'update':
                return await this.updateCard(executeFunctions);
            case 'move':
                return await this.moveCard(executeFunctions);
            case 'delete':
                return await this.deleteCard(executeFunctions);
            default:
                throw new Error(`Operação não suportada para card: ${operation}`);
        }
    }
    
    // Operações de Webhook
    private async executeWebhookOperation(executeFunctions: IExecuteFunctions, operation: string) {
        switch (operation) {
            case 'list':
                return await this.listWebhooks(executeFunctions);
            case 'create':
                return await this.createWebhook(executeFunctions);
            case 'update':
                return await this.updateWebhook(executeFunctions);
            case 'delete':
                return await this.deleteWebhook(executeFunctions);
            default:
                throw new Error(`Operação não suportada para webhook: ${operation}`);
        }
    }
    
    // Operações de Organization
    private async executeOrganizationOperation(executeFunctions: IExecuteFunctions, operation: string) {
        switch (operation) {
            case 'get':
                return await this.getOrganization(executeFunctions);
            case 'list':
                return await this.listOrganizations(executeFunctions);
            default:
                throw new Error(`Operação não suportada para organization: ${operation}`);
        }
    }
    
    // ----- Implementações das operações -----
    
    // Pipe: Consultar
    private async getPipe(executeFunctions: IExecuteFunctions) {
        const pipeId = executeFunctions.getNodeParameter('pipeId', 0) as string;
        const options = executeFunctions.getNodeParameter('options', 0, {}) as {
            includePhases?: boolean,
            includeCards?: boolean,
            includeFields?: boolean,
        };
        
        // Construir campos da consulta com base nas opções
        let phasesQuery = '';
        let cardsQuery = '';
        let fieldsQuery = '';
        
        if (options.includePhases) {
            phasesQuery = `
                phases {
                    id
                    name
                    cards_count
                    done
                    description
                }
            `;
        }
        
        if (options.includeCards) {
            cardsQuery = `
                cards(first: 20) {
                    edges {
                        node {
                            id
                            title
                            current_phase {
                                id
                                name
                            }
                            created_at
                            updated_at
                            due_date
                        }
                    }
                }
            `;
        }
        
        if (options.includeFields) {
            fieldsQuery = `
                start_form_fields {
                    id
                    label
                    type
                    required
                    description
                }
            `;
        }
        
        const query = `
            query GetPipe($id: ID!) {
                pipe(id: $id) {
                    id
                    name
                    description
                    icon
                    created_at
                    updated_at
                    public
                    ${phasesQuery}
                    ${cardsQuery}
                    ${fieldsQuery}
                }
            }
        `;
        
        const variables = { id: pipeId };
        const data = await this.graphqlRequest(executeFunctions, query, variables);
        return data.pipe;
    }
    
    // Pipe: Criar
    private async createPipe(executeFunctions: IExecuteFunctions) {
        const organizationId = executeFunctions.getNodeParameter('organizationId', 0) as string;
        const pipeName = executeFunctions.getNodeParameter('pipeName', 0) as string;
        const options = executeFunctions.getNodeParameter('options', 0, {}) as {
            description?: string,
            isPublic?: boolean,
        };
        
        const query = `
            mutation CreatePipe($input: CreatePipeInput!) {
                createPipe(input: $input) {
                    pipe {
                        id
                        name
                        description
                        created_at
                        public
                    }
                }
            }
        `;
        
        const variables = {
            input: {
                organization_id: organizationId,
                name: pipeName,
                description: options.description || '',
                public: options.isPublic || false,
            },
        };
        
        const data = await this.graphqlRequest(executeFunctions, query, variables);
        return data.createPipe.pipe;
    }
    
    // Pipe: Atualizar
    private async updatePipe(executeFunctions: IExecuteFunctions) {
        const pipeId = executeFunctions.getNodeParameter('pipeId', 0) as string;
        const updateFields = executeFunctions.getNodeParameter('updateFields', 0, {}) as {
            name?: string,
            description?: string,
            isPublic?: boolean,
        };
        
        const input: Record<string, any> = { id: pipeId };
        
        if (updateFields.name) input.name = updateFields.name;
        if (updateFields.description !== undefined) input.description = updateFields.description;
        if (updateFields.isPublic !== undefined) input.public = updateFields.isPublic;
        
        const query = `
            mutation UpdatePipe($input: UpdatePipeInput!) {
                updatePipe(input: $input) {
                    pipe {
                        id
                        name
                        description
                        public
                        updated_at
                    }
                }
            }
        `;
        
        const variables = { input };
        const data = await this.graphqlRequest(executeFunctions, query, variables);
        return data.updatePipe.pipe;
    }
    
    // Pipe: Excluir
    private async deletePipe(executeFunctions: IExecuteFunctions) {
        const pipeId = executeFunctions.getNodeParameter('pipeId', 0) as string;
        
        const query = `
            mutation DeletePipe($input: DeletePipeInput!) {
                deletePipe(input: $input) {
                    success
                }
            }
        `;
        
        const variables = {
            input: {
                id: pipeId,
            },
        };
        
        const data = await this.graphqlRequest(executeFunctions, query, variables);
        return data.deletePipe;
    }
    
    // Card: Consultar
    private async getCard(executeFunctions: IExecuteFunctions) {
        const cardId = executeFunctions.getNodeParameter('cardId', 0) as string;
        const options = executeFunctions.getNodeParameter('options', 0, {}) as {
            includeFields?: boolean,
            includeComments?: boolean,
            includeAttachments?: boolean,
        };
        
        // Construir campos da consulta com base nas opções
        let fieldsQuery = '';
        let commentsQuery = '';
        let attachmentsQuery = '';
        
        if (options.includeFields) {
            fieldsQuery = `
                fields {
                    name
                    value
                    field {
                        id
                        type
                        label
                    }
                }
            `;
        }
        
        if (options.includeComments) {
            commentsQuery = `
                comments {
                    text
                    created_at
                    author {
                        name
                        email
                    }
                }
            `;
        }
        
        if (options.includeAttachments) {
            attachmentsQuery = `
                attachments {
                    url
                    filename
                    created_at
                }
            `;
        }
        
        const query = `
            query GetCard($id: ID!) {
                card(id: $id) {
                    id
                    title
                    due_date
                    created_at
                    updated_at
                    finished_at
                    expired
                    late
                    pipe {
                        id
                        name
                    }
                    current_phase {
                        id
                        name
                    }
                    ${fieldsQuery}
                    ${commentsQuery}
                    ${attachmentsQuery}
                }
            }
        `;
        
        const variables = { id: cardId };
        const data = await this.graphqlRequest(executeFunctions, query, variables);
        return data.card;
    }
    
    // Card: Criar
    private async createCard(executeFunctions: IExecuteFunctions) {
        const pipeId = executeFunctions.getNodeParameter('pipeId', 0) as string;
        const title = executeFunctions.getNodeParameter('title', 0) as string;
        const phaseId = executeFunctions.getNodeParameter('phaseId', 0, '') as string;
        const customFieldsCollection = executeFunctions.getNodeParameter('customFields', 0, { fields: [] }) as { fields: Array<{ fieldId: string, value: string }> };
        const options = executeFunctions.getNodeParameter('options', 0, {}) as {
            dueDate?: string,
            assigneeIds?: string,
        };
        
        // Preparar dados dos campos customizados
        const fieldsAttributes = customFieldsCollection.fields.map(field => ({
            field_id: field.fieldId,
            value: field.value,
        }));
        
        // Preparar dados dos responsáveis
        let assigneeIds: string[] = [];
        if (options.assigneeIds) {
            assigneeIds = options.assigneeIds.split(',').map(id => id.trim());
        }
        
        const input: Record<string, any> = {
            pipe_id: pipeId,
            title,
            fields_attributes: fieldsAttributes,
        };
        
        if (phaseId) input.phase_id = phaseId;
        if (options.dueDate) input.due_date = options.dueDate;
        if (assigneeIds.length > 0) input.assignee_ids = assigneeIds;
        
        const query = `
            mutation CreateCard($input: CreateCardInput!) {
                createCard(input: $input) {
                    card {
                        id
                        title
                        due_date
                        created_at
                        pipe {
                            id
                            name
                        }
                        current_phase {
                            id
                            name
                        }
                    }
                }
            }
        `;
        
        const variables = { input };
        const data = await this.graphqlRequest(executeFunctions, query, variables);
        return data.createCard.card;
    }
    
    // Card: Atualizar
    private async updateCard(executeFunctions: IExecuteFunctions) {
        const cardId = executeFunctions.getNodeParameter('cardId', 0) as string;
        const updateFields = executeFunctions.getNodeParameter('updateFields', 0, {}) as {
            title?: string,
            dueDate?: string,
        };
        const customFieldsCollection = executeFunctions.getNodeParameter('customFields', 0, { fields: [] }) as { fields: Array<{ fieldId: string, value: string }> };
        
        // Preparar dados dos campos customizados
        const fieldsAttributes = customFieldsCollection.fields.map(field => ({
            field_id: field.fieldId,
            value: field.value,
        }));
        
        const input: Record<string, any> = { id: cardId };
        
        if (updateFields.title) input.title = updateFields.title;
        if (updateFields.dueDate) input.due_date = updateFields.dueDate;
        if (fieldsAttributes.length > 0) input.fields_attributes = fieldsAttributes;
        
        const query = `
            mutation UpdateCard($input: UpdateCardInput!) {
                updateCard(input: $input) {
                    card {
                        id
                        title
                        due_date
                        updated_at
                        current_phase {
                            id
                            name
                        }
                    }
                }
            }
        `;
        
        const variables = { input };
        const data = await this.graphqlRequest(executeFunctions, query, variables);
        return data.updateCard.card;
    }
    
    // Card: Mover
    private async moveCard(executeFunctions: IExecuteFunctions) {
        const cardId = executeFunctions.getNodeParameter('cardId', 0) as string;
        const destinationPhaseId = executeFunctions.getNodeParameter('destinationPhaseId', 0) as string;
        
        const query = `
            mutation MoveCardToPhase($input: MoveCardToPhaseInput!) {
                moveCardToPhase(input: $input) {
                    card {
                        id
                        title
                        current_phase {
                            id
                            name
                        }
                        updated_at
                    }
                }
            }
        `;
        
        const variables = {
            input: {
                card_id: cardId,
                destination_phase_id: destinationPhaseId,
            },
        };
        
        const data = await this.graphqlRequest(executeFunctions, query, variables);
        return data.moveCardToPhase.card;
    }
    
    // Card: Excluir
    private async deleteCard(executeFunctions: IExecuteFunctions) {
        const cardId = executeFunctions.getNodeParameter('cardId', 0) as string;
        
        const query = `
            mutation DeleteCard($input: DeleteCardInput!) {
                deleteCard(input: $input) {
                    success
                }
            }
        `;
        
        const variables = {
            input: {
                id: cardId,
            },
        };
        
        const data = await this.graphqlRequest(executeFunctions, query, variables);
        return data.deleteCard;
    }
    
    // Webhook: Listar
    private async listWebhooks(executeFunctions: IExecuteFunctions) {
        const organizationId = executeFunctions.getNodeParameter('organizationId', 0) as string;
        
        const query = `
            query GetOrganizationWebhooks($id: ID!) {
                organization(id: $id) {
                    webhooks {
                        edges {
                            node {
                                id
                                name
                                url
                                actions
                                headers
                                is_active
                                created_at
                            }
                        }
                    }
                }
            }
        `;
        
        const variables = { id: organizationId };
        const data = await this.graphqlRequest(executeFunctions, query, variables);
        
        // Transformar resultado para lista plana de webhooks
        return data.organization.webhooks.edges.map((edge: any) => edge.node);
    }
    
    // Webhook: Criar
    private async createWebhook(executeFunctions: IExecuteFunctions) {
        const organizationId = executeFunctions.getNodeParameter('organizationId', 0) as string;
        const url = executeFunctions.getNodeParameter('url', 0) as string;
        const actions = executeFunctions.getNodeParameter('actions', 0) as string[];
        const options = executeFunctions.getNodeParameter('options', 0, {}) as {
            name?: string,
            headers?: { parameters: Array<{ name: string, value: string }> },
        };
        
        // Preparar headers personalizados
        const headers: Record<string, string> = {};
        if (options.headers && options.headers.parameters) {
            for (const param of options.headers.parameters) {
                headers[param.name] = param.value;
            }
        }
        
        const query = `
            mutation CreateWebhook($input: CreateWebhookInput!) {
                createWebhook(input: $input) {
                    webhook {
                        id
                        name
                        url
                        actions
                        headers
                        is_active
                        created_at
                    }
                }
            }
        `;
        
        const variables = {
            input: {
                organization_id: organizationId,
                name: options.name || `Webhook para ${url}`,
                url,
                actions,
                headers: Object.keys(headers).length > 0 ? headers : undefined,
                email_notification: true,
            },
        };
        
        const data = await this.graphqlRequest(executeFunctions, query, variables);
        return data.createWebhook.webhook;
    }
    
    // Webhook: Atualizar
    private async updateWebhook(executeFunctions: IExecuteFunctions) {
        const webhookId = executeFunctions.getNodeParameter('webhookId', 0) as string;
        const updateFields = executeFunctions.getNodeParameter('updateFields', 0, {}) as {
            url?: string,
            name?: string,
            actions?: string[],
        };
        
        const input: Record<string, any> = { id: webhookId };
        
        if (updateFields.url) input.url = updateFields.url;
        if (updateFields.name) input.name = updateFields.name;
        if (updateFields.actions) input.actions = updateFields.actions;
        
        const query = `
            mutation UpdateWebhook($input: UpdateWebhookInput!) {
                updateWebhook(input: $input) {
                    webhook {
                        id
                        name
                        url
                        actions
                        headers
                        is_active
                        updated_at
                    }
                }
            }
        `;
        
        const variables = { input };
        const data = await this.graphqlRequest(executeFunctions, query, variables);
        return data.updateWebhook.webhook;
    }
    
    // Webhook: Excluir
    private async deleteWebhook(executeFunctions: IExecuteFunctions) {
        const webhookId = executeFunctions.getNodeParameter('webhookId', 0) as string;
        
        const query = `
            mutation DeleteWebhook($input: DeleteWebhookInput!) {
                deleteWebhook(input: $input) {
                    success
                }
            }
        `;
        
        const variables = {
            input: {
                id: webhookId,
            },
        };
        
        const data = await this.graphqlRequest(executeFunctions, query, variables);
        return data.deleteWebhook;
    }
    
    // Organization: Consultar
    private async getOrganization(executeFunctions: IExecuteFunctions) {
        const organizationId = executeFunctions.getNodeParameter('organizationId', 0) as string;
        const options = executeFunctions.getNodeParameter('options', 0, {}) as {
            includePipes?: boolean,
            includeMembers?: boolean,
            includeTables?: boolean,
        };
        
        // Construir campos da consulta com base nas opções
        let pipesQuery = '';
        let membersQuery = '';
        let tablesQuery = '';
        
        if (options.includePipes) {
            pipesQuery = `
                pipes(first: 20) {
                    edges {
                        node {
                            id
                            name
                            created_at
                            phases_count
                        }
                    }
                }
            `;
        }
        
        if (options.includeMembers) {
            membersQuery = `
                members(first: 30) {
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
            `;
        }
        
        if (options.includeTables) {
            tablesQuery = `
                tables(first: 20) {
                    edges {
                        node {
                            id
                            name
                            created_at
                            records_count
                        }
                    }
                }
            `;
        }
        
        const query = `
            query GetOrganization($id: ID!) {
                organization(id: $id) {
                    id
                    name
                    created_at
                    updated_at
                    ${pipesQuery}
                    ${membersQuery}
                    ${tablesQuery}
                }
            }
        `;
        
        const variables = { id: organizationId };
        const data = await this.graphqlRequest(executeFunctions, query, variables);
        return data.organization;
    }
    
    // Organization: Listar
    private async listOrganizations(executeFunctions: IExecuteFunctions) {
        const options = executeFunctions.getNodeParameter('options', 0, {}) as {
            limit?: number,
        };
        
        const limit = options.limit || 10;
        
        const query = `
            query ListMyOrganizations {
                me {
                    organizations(first: ${limit}) {
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
            }
        `;
        
        const data = await this.graphqlRequest(executeFunctions, query);
        
        // Transformar resultado para lista plana de organizações
        return data.me.organizations.edges.map((edge: any) => edge.node);
    }
}

// Exporta uma instância única da API
export const pipefy = new PipefyAPI(); 