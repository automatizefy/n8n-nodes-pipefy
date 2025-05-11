import { IExecuteFunctions } from 'n8n-workflow';
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
    
    const query = `
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
    `;
    
    const response = await pipefy.graphqlRequest(this, query, variables);
    
    return response.moveCardToPhase.card;
}