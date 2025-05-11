import { IExecuteFunctions } from 'n8n-workflow';
import { pipefy } from '../../PipefyApi';

/**
 * Obtém detalhes de um card no Pipefy
 */
export async function getCard(this: IExecuteFunctions) {
    const cardId = this.getNodeParameter('cardId', 0) as string;
    const options = this.getNodeParameter('options', 0, {}) as {
        includeFields?: boolean,
        includePhase?: boolean,
        includeAssignees?: boolean,
    };
    
    // Construir campos da consulta com base nas opções
    let fieldsQuery = '';
    let phaseQuery = '';
    let assigneesQuery = '';
    
    if (options.includeFields) {
        fieldsQuery = `
            fields {
                name
                value
                field {
                    id
                    label
                    type
                }
            }
        `;
    }
    
    if (options.includePhase) {
        phaseQuery = `
            current_phase {
                id
                name
                done
                description
            }
        `;
    }
    
    if (options.includeAssignees) {
        assigneesQuery = `
            assignees {
                id
                name
                email
                username
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
                pipe {
                    id
                    name
                }
                ${phaseQuery}
                ${fieldsQuery}
                ${assigneesQuery}
            }
        }
    `;
    
    const variables = {
        id: cardId,
    };
    
    const response = await pipefy.graphqlRequest(this, query, variables);
    
    return response.card;
} 