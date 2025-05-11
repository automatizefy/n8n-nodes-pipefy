import { IExecuteFunctions } from 'n8n-workflow';
import { pipefy } from '../../PipefyApi';

/**
 * Exclui um card no Pipefy
 */
export async function deleteCard(this: IExecuteFunctions) {
    const cardId = this.getNodeParameter('cardId', 0) as string;
    
    const variables = {
        cardId,
    };
    
    const query = `
        mutation DeleteCard($cardId: ID!) {
            deleteCard(input: {
                id: $cardId
            }) {
                success
            }
        }
    `;
    
    const response = await pipefy.graphqlRequest(this, query, variables);
    
    return {
        id: cardId,
        success: response.deleteCard.success,
    };
}