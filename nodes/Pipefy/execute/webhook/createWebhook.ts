import { IExecuteFunctions } from 'n8n-workflow';
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
    
    const query = `
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
    `;
    
    const response = await pipefy.graphqlRequest(this, query, variables);
    
    return response.createWebhook.webhook;
}