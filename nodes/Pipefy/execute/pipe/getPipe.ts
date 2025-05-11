import { IExecuteFunctions } from 'n8n-workflow';
import { pipefy } from '../../PipefyApi';

/**
 * Obtém detalhes de um pipe específico
 */
export async function getPipe(executeFunctions: IExecuteFunctions) {
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
    const data = await pipefy.graphqlRequest(executeFunctions, query, variables);
    return data.pipe;
} 