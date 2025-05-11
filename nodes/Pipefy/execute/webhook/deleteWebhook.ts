import { IExecuteFunctions } from 'n8n-workflow';
import { pipefy } from '../../PipefyApi';

/**
 * Exclui um webhook no Pipefy
 */
export async function deleteWebhook(this: IExecuteFunctions) {
    const webhookId = this.getNodeParameter('webhookId', 0) as string;
    
    const variables = {
        webhookId,
    };
    
    const query = `
        mutation DeleteWebhook($webhookId: ID!) {
            deleteWebhook(input: {
                id: $webhookId
            }) {
                success
            }
        }
    `;
    
    const response = await pipefy.graphqlRequest(this, query, variables);
    
    return {
        id: webhookId,
        success: response.deleteWebhook.success,
    };
}