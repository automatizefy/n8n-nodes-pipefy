import { IExecuteFunctions } from 'n8n-workflow';
import { pipefy } from '../../PipefyApi';

/**
 * Exclui um pipe no Pipefy
 */
export async function deletePipe(this: IExecuteFunctions) {
    const pipeId = this.getNodeParameter('pipeId', 0) as string;
    
    const variables = {
        pipeId,
    };
    
    const query = `
        mutation DeletePipe($pipeId: ID!) {
            deletePipe(input: {
                id: $pipeId
            }) {
                success
            }
        }
    `;
    
    const response = await pipefy.graphqlRequest(this, query, variables);
    
    return {
        id: pipeId,
        success: response.deletePipe.success,
    };
} 