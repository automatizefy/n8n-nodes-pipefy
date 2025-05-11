import { IExecuteFunctions } from 'n8n-workflow';
import { pipefy } from '../../PipefyApi';

/**
 * Atualiza um card existente no Pipefy
 */
export async function updateCard(this: IExecuteFunctions) {
    const cardId = this.getNodeParameter('cardId', 0) as string;
    const options = this.getNodeParameter('options', 0, {}) as {
        title?: string,
        dueDate?: string,
        fields?: Array<{ name: string, value: string }>
    };
    
    const variables: Record<string, any> = {
        cardId,
        title: options.title,
        dueDate: options.dueDate,
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
        mutation UpdateCard($cardId: ID!, $title: String, $dueDate: DateTime, $fields: [FieldValueInput!]) {
            updateCard(input: {
                id: $cardId,
                title: $title,
                due_date: $dueDate
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
    
    return response.updateCard.card;
}