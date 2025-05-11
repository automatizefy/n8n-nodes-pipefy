import { IExecuteFunctions } from 'n8n-workflow';
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
    
    const query = `
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
    `;
    
    const response = await pipefy.graphqlRequest(this, query, variables);
    
    return response.updateWebhook.webhook;
}