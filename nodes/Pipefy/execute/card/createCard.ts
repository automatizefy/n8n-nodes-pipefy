import { IExecuteFunctions } from 'n8n-workflow';
import { pipefy } from '../../PipefyApi';

/**
 * Cria um novo card no Pipefy
 */
export async function createCard(this: IExecuteFunctions) {
    const pipeId = this.getNodeParameter('pipeId', 0) as string;
    const title = this.getNodeParameter('title', 0) as string;
    const options = this.getNodeParameter('options', 0, {}) as {
        phaseId?: string,
        dueDate?: string,
        fields?: Array<{ name: string, value: string }>
    };
    
    const variables: Record<string, any> = {
        pipeId,
        title,
        dueDate: options.dueDate,
        phaseId: options.phaseId,
    };
    
    let fieldsQuery = '';
    let fieldsVariables = {};
    
    if (options.fields && options.fields.length > 0) {
        fieldsQuery = `
            fields: $fields
        `;
        
        fieldsVariables = {
            fields: options.fields.map(field => ({
                field_id: field.name,
                field_value: field.value,
            })),
        };
    }
    
    const query = `
        mutation CreateCard($pipeId: ID!, $title: String!, $dueDate: DateTime, $phaseId: ID, $fields: [FieldValueInput!]) {
            createCard(input: {
                pipe_id: $pipeId,
                title: $title,
                due_date: $dueDate,
                phase_id: $phaseId
                ${fieldsQuery}
            }) {
                card {
                    id
                    title
                    due_date
                    current_phase {
                        id
                        name
                    }
                    created_at
                    updated_at
                }
            }
        }
    `;
    
    const response = await pipefy.graphqlRequest(this, query, { ...variables, ...fieldsVariables });
    
    return response.createCard.card;
}