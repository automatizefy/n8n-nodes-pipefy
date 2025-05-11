import { IExecuteFunctions } from 'n8n-workflow';
import { pipefy } from '../../PipefyApi';

/**
 * Atualiza um pipe existente no Pipefy
 */
export async function updatePipe(this: IExecuteFunctions) {
    const pipeId = this.getNodeParameter('pipeId', 0) as string;
    const name = this.getNodeParameter('name', 0, undefined) as string | undefined;
    const description = this.getNodeParameter('description', 0, undefined) as string | undefined;
    const icon = this.getNodeParameter('icon', 0, undefined) as string | undefined;
    
    const variables: Record<string, any> = {
        pipeId,
        name,
        description,
        icon,
    };
    
    // Remover campos undefined
    Object.keys(variables).forEach(key => {
        if (variables[key] === undefined) {
            delete variables[key];
        }
    });
    
    const query = `
        mutation UpdatePipe($pipeId: ID!, $name: String, $description: String, $icon: String) {
            updatePipe(input: {
                id: $pipeId,
                name: $name,
                description: $description,
                icon: $icon
            }) {
                pipe {
                    id
                    name
                    description
                    icon
                    created_at
                    updated_at
                }
            }
        }
    `;
    
    const response = await pipefy.graphqlRequest(this, query, variables);
    
    return response.updatePipe.pipe;
} 