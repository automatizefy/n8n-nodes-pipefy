import { IExecuteFunctions } from 'n8n-workflow';
import { pipefy } from '../../PipefyApi';

/**
 * Lista webhooks de um pipe no Pipefy
 */
export async function listWebhooks(this: IExecuteFunctions) {
    const pipeId = this.getNodeParameter('pipeId', 0) as string;
    
    const variables = {
        pipeId,
    };
    
    const query = `
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
    `;
    
    const response = await pipefy.graphqlRequest(this, query, variables);
    
    return response.pipe.webhooks;
}